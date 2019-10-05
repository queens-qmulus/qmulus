import axios from 'axios'
import fs from 'fs'
import dotenv from 'dotenv'

import Building from '../api/buildings/model'
import Course from '../api/courses/model'
import Department from '../api/departments/model'
import Section from '../api/sections/model'
import News from '../api/news/model'
import Textbook from '../api/textbooks/model'

import { getLastIngest } from './ingestRecord'

import logger from '../utils/logger'

dotenv.config()
export const GITHUB_USERNAME = process.env.GITHUB_USERNAME
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN
export const GITHUB_REPO = process.env.GITHUB_REPO
export const GITHUB_BASE_URL = `https://api.github.com/repos/${GITHUB_REPO}`
export const AUTH = {
  username: GITHUB_USERNAME,
  password: GITHUB_TOKEN,
}
const APPROVED_PRODUCTION_VERSION_URL =
  `${process.env.QMULUS_MANAGEMENT_URL}/api/ingestVersion/production`
const INTER_SERVICE_SECRET = process.env.INTER_SERVICE_SECRET
export const IS_STAGING = process.env.IS_STAGING === 'true'

// TODO: define constants to ensure that collectionName
// is the same as the module names we use in the scrapers.
// We should be using [Building.collection.collectionName]: Building
export const MODULE_TO_MODEL = {
  buildings: Building,
  courses: Course,
  departments: Department,
  sections: Section,
  news: News,
  textbooks: Textbook,
}

/** Get default ingest metadata. */
export function getDefaultIngestMetadata (uuid) {
  return {
    ingestUuid: uuid,
    status: 'initiated', // 'initiated', 'started', 'done', 'error'
    startDate: new Date(),
    version: '',
    inProgressModules: new Set(),
    startedModules: [],
    datasetModules: {},
    exceptions: [],
  }
}

export function getDefaultModuleMetadata () {
  return {
    updated: {},
    inserted: [],
    failed: [],
  }
}

export function createLineMetadata (outcome,
  id = '', diff = '', exception = '') {
  return {
    id, // doc id
    outcome, // updated, inserted, failed
    diff, // if updated, stringified object diff
    exception, // stringified uncaught exceptions
  }
}

export function getContentsUrl (sha, filename) {
  return `https://raw.githubusercontent.com/${GITHUB_REPO}/${sha}/${filename}`
}

export async function getVersionToIngest () {
  const { version: lastVersion } = await getLastIngest() || {}
  let approvedVersion

  // TODO: this endpoint only returns a limited number of commits.
  // If last version is too out of date, it may not be in the response.
  const recentCommits = await axios({
    url: `${GITHUB_BASE_URL}/commits`,
    method: 'get',
    auth: AUTH,
  }).then(res => res.data)
  const recentCommitShas = recentCommits.map(commit => commit.sha)
  if (!recentCommitShas[0]) throw new Error('No commits found')

  if (IS_STAGING) {
    approvedVersion = recentCommitShas[0]
  } else {
    try {
      const res = await axios({
        url: APPROVED_PRODUCTION_VERSION_URL,
        method: 'post',
        data: {
          secret: INTER_SERVICE_SECRET,
        },
      })
      approvedVersion = res.data[0].version
    } catch (ex) {
      logger.error('Failed to fetch approvedVersion')
    }
  }
  if (!approvedVersion) throw new Error('No approved version.')

  if (lastVersion === approvedVersion) {
    logger.info('Approved version already ingested.')
    return
  }

  let versionToIngest = approvedVersion
  const startIndex = recentCommitShas.indexOf(approvedVersion)
  for (let i = startIndex; i < recentCommitShas.length; i++) {
    if (recentCommitShas[i] === lastVersion && recentCommitShas[i - 1]) {
      versionToIngest = recentCommitShas[i - 1]
      break
    }
  }

  const versionData = await axios({
    url: `${GITHUB_BASE_URL}/commits/${versionToIngest}`,
    method: 'get',
    auth: AUTH,
  }).then(res => res.data)

  return { sha: versionToIngest, files: versionData.files }
}

export function fetchFileDownload (contentsUrl, savedFileName) {
  return new Promise((resolve, reject) => {
    axios({
      url: contentsUrl,
      method: 'get',
      auth: AUTH,
      responseType: 'stream',
    }).then(res => {
      res.data.pipe(fs.createWriteStream(savedFileName, { encoding: 'utf8' })
        .on('close', resolve))
    }).catch(reject)
  })
}

export function fetchFileContents (contentsUrl, savedFileName) {
  return new Promise((resolve, reject) => {
    axios({
      url: contentsUrl,
      method: 'get',
      auth: AUTH,
      responseType: 'json',
    }).then(res => {
      const buff = Buffer.from(res.data.content, 'base64')
      const text = buff.toString('utf-8')
      fs.writeFile(savedFileName, text, (err) => {
        if (err) reject(err)
        resolve()
      })
    }).catch(reject)
  })
}
