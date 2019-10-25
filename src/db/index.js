import fs from 'fs'
import readline from 'readline'
import { diff } from 'deep-object-diff'
import dotenv from 'dotenv'
import axios from 'axios'
import uuidv1 from 'uuid/v1'

import logger from '../utils/logger'

import { saveIngestRecord } from './ingestRecord'
import {
  MODULE_TO_MODEL,
  getDefaultIngestMetadata,
  getDefaultModuleMetadata,
  createLineMetadata,
  fetchFileDownload,
  getVersionToIngest,
  getContentsUrl,
} from './utils'

dotenv.config()
const IS_STAGING = process.env.IS_STAGING === 'true'
const INGEST_METADATA_API_URL =
  `${process.env.QMULUS_MANAGEMENT_URL}/api/ingestMetadata/accept`
const INTER_SERVICE_SECRET = process.env.INTER_SERVICE_SECRET

const MODULE_SET = new Set(Object.keys(MODULE_TO_MODEL))
const moduleNameFromFilename = (filename) => filename.replace('.json', '')

/** Singleton Instace of IngestManager */
let ingestManagerInstance
export function getIngestManager () {
  if (!ingestManagerInstance) ingestManagerInstance = new IngestManager()
  return ingestManagerInstance
}

class IngestManager {
  constructor () {
    this.inProgress = false
  }

  async startIngest () {
    if (this.inProgress) return false

    const ingestMetadata = getDefaultIngestMetadata(uuidv1())
    let seqPromise

    try {
      const version = await getVersionToIngest()
      if (!version) throw new Error('Couldn\'t find version to ingest')

      ingestMetadata.version = version.sha
      this.sendMetadata(ingestMetadata)

      const modulesToIngest = version.files.filter(({ filename, status }) => {
        return MODULE_SET.has(moduleNameFromFilename(filename)) &&
          status !== 'removed'
      })

      if (!modulesToIngest.length) {
        throw new Error('No modules to ingest')
      }

      seqPromise = modulesToIngest.reduce((previousPromise, nextModule) => {
        const { filename } = nextModule
        return previousPromise.then(() => {
          const contentsUrl = getContentsUrl(version.sha, filename)
          const moduleName = moduleNameFromFilename(filename)
          const savedFileName = `${__dirname}/${version.sha}_${filename}`
          return fetchFileDownload(contentsUrl, savedFileName)
            .then(() => {
              const readInterface = readline.createInterface({
                input: fs.createReadStream(savedFileName, { encoding: 'utf8' }),
                console: false,
              })

              ingestMetadata.status = 'started'
              ingestMetadata.startedModules.push(moduleName)
              this.sendMetadata(ingestMetadata)

              return this.ingestModule(moduleName, readInterface)
                .then((moduleMetadata) => {
                  ingestMetadata.datasetModules[moduleName] = moduleMetadata
                })
                .catch((ex) => {
                  logger
                    .error(`Error occured during ingest for ${moduleName}`, ex)
                  ingestMetadata.exceptions.push(ex.toString())
                })
            })
            .catch((ex) => {
              logger
                .error(`Error occured dataset fetch/read for ${moduleName}`, ex)
              ingestMetadata.exceptions.push(ex.toString())
              throw ex
            })
        })
      }, Promise.resolve())
    } catch (ex) {
      ingestMetadata.status = 'error'

      ingestMetadata.exceptions.push(ex.toString())
      this.sendMetadata(ingestMetadata)
      this.inProgress = false

      logger.error('Uncaught error occured while ingesting ', ex)
    }

    seqPromise.then(() => {
      ingestMetadata.status = 'done'
      this.sendMetadata(ingestMetadata)
      saveIngestRecord(ingestMetadata)
      this.inProgress = false
      logger.info('All ingests completed')
    }).catch((ex) => {
      ingestMetadata.status = 'error'
      this.sendMetadata(ingestMetadata)
      this.inProgress = false
      logger.error('Error while ingesting', ex)
    })

    return true
  }

  async ingestModule (moduleName, readInterface) {
    logger.info(`Starting ${moduleName} module ingest`)

    const moduleMetadata = getDefaultModuleMetadata()
    const promises = [
      new Promise((resolve) => readInterface.on('close',
        () => {
          // TODO: timeout needed to allow for the longest on('line') to execute
          // and add to the promises queue before on('close') is triggered.
          // Perhaps using readlines with an async iterator,
          // available in node 11+
          setTimeout(resolve, 3 * 60 * 1000)
        })),
    ]

    readInterface.on('line', (fileLine) => {
      if (!fileLine) {
        return // if empty, ignore
      }
      const lineResHandler = (lineMetadata) => {
        const outcome = lineMetadata.outcome
        const docId = lineMetadata.id
        if (outcome === 'updated') {
          moduleMetadata[outcome][docId] = {
            id: lineMetadata.id,
            diff: lineMetadata.diff,
          }
        } else if (outcome === 'inserted') {
          moduleMetadata[outcome].push(docId)
        } else if (outcome === 'failed') {
          moduleMetadata[outcome].push(lineMetadata)
        }
      }

      promises.push(
        this.ingestLine(fileLine, moduleName)
          .then(lineResHandler)
          .catch(lineResHandler)
      )
    })

    await Promise.all(promises)
    logger.info(`Created ${moduleMetadata.inserted.length}` +
      ` new ${moduleName} record(s)`)
    logger.info(
      [
        'Updated',
        Object.values(moduleMetadata.updated).length,
        moduleName,
        'record(s)',
      ].join(' ')
    )
    if (moduleMetadata.failed.length) {
      logger.error(`Failed on ${moduleMetadata.failed.length}` +
        ` new ${moduleName} record(s)`)
    }
    return moduleMetadata
  }

  async ingestLine (fileLine, moduleName) {
    const MongooseModel = MODULE_TO_MODEL[moduleName]

    try {
      const newDoc = JSON.parse(fileLine)
      const oldDoc = await MongooseModel
        .findOne({ id: newDoc.id }, '-_id -__v', { lean: true }).exec()

      if (oldDoc) {
        return MongooseModel.updateOne({ id: oldDoc.id }, newDoc).then(() => {
          const docDiff = diff(oldDoc, newDoc)
          return createLineMetadata('updated',
            oldDoc.id,
            JSON.stringify(docDiff)
          )
        }).catch((ex) => {
          logger.error(`Failed to update existing ${moduleName} record`, ex)
          return createLineMetadata('failed', oldDoc.id, /* diff */ '', ex)
        })
      } else {
        return MongooseModel.create(newDoc).then(() => {
          return createLineMetadata('inserted', newDoc.id)
        }).catch((ex) => {
          logger.error(`Failed to create new ${moduleName} record`, ex)
          return createLineMetadata('failed', /* id */ '', /* diff */ '', ex)
        })
      }
    } catch (ex) {
      console.log(fileLine)
      logger.error(`Uncaught exception during ${moduleName} line ingest`, ex)
      return createLineMetadata('failed', /* id */ '', /* diff */ '', ex)
    }
  }

  sendMetadata (metadata) {
    logger.info('Sending metadata to ingest service', metadata.status)

    axios({
      url: INGEST_METADATA_API_URL,
      method: 'POST',
      data: {
        tier: IS_STAGING ? 'staging' : 'production',
        secret: INTER_SERVICE_SECRET,
        version: metadata.version,
        ingestUuid: metadata.ingestUuid,
        timestamp: new Date(),
        ingestMetadata: metadata,
      },
    }).catch(ex => {
      logger.error('Failed to send metadata to ingest service', ex)
    })
  }
}
