import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import morgan from 'morgan'
// import apicache from 'apicache' // TODO: Remove after
import { MongoMemoryServer } from 'mongodb-memory-server'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import forceHttps from 'express-force-https'

import buildings from './api/buildings'
import courses from './api/courses'
import departments from './api/departments'
import news from './api/news'
import sections from './api/sections'
import textbooks from './api/textbooks'

import ingest from './api/ingest'

import utils from './utils'
import logger from './utils/logger'
import { tokenValidator, getApiTokenManager } from './utils/apiTokenManager'

dotenv.config()
const IS_STAGING = process.env.IS_STAGING === 'true'
const FORCE_HTTPS = process.env.FORCE_HTTPS === 'true'

const app = express()
// const cache = apicache.middleware // TODO: Remove after
const IS_TEST = process.argv.join().match('/ava/')
const MONGO_URI = process.env.QMULUS_MONGO_URI ||
 'mongodb://localhost:27017/qmulus'
const { version, showAvailableUrls, checkRateLimit, rateLimiter } = utils

if (IS_TEST) {
  const mongoServer = new MongoMemoryServer()
  mongoServer.getConnectionString().then((inMemUri) => {
    mongoose.connect(inMemUri, { useNewUrlParser: true }, err => {
      if (err) throw new Error('Connection failed')
      if (!IS_TEST) logger.info('Connected to database')
    })
  })
} else {
  mongoose.connect(MONGO_URI, { useNewUrlParser: true }, err => {
    if (err) throw new Error('Connection failed')
    if (!IS_TEST) logger.info('Connected to database')
  })
}

// Third-party middleware
if (FORCE_HTTPS) {
  app.use(forceHttps)
}
app.use(helmet())
app.use(compression())
// app.use(cache('5 minutes')) // TODO: Remove after
app.use(rateLimiter)
app.use(bodyParser.json())

if (!IS_TEST) {
  app.use(morgan(logger.morganFormat, { stream: logger.winstonStream }))
}

if (IS_STAGING) {
  // For demo/PR review purposes, serve up the docs/ folder.
  // In production, this isn't needed since github pages will serve the
  // docs at docs.qmulus.io
  app.use('/docs', express.static(`${__dirname}/../docs`))
}

// Temp loader.io verification endpoint
app.get('/loaderio-caaf47357a9af9fdde72ae2d64914656',
  (req, res) => res.send('loaderio-caaf47357a9af9fdde72ae2d64914656'))

// Admin endpoints
app.use('/ingest', ingest)

// Informational API endpoints
app.get(`/${version}`, showAvailableUrls)
app.get(`/${version}/rate_limit`, tokenValidator, checkRateLimit)

// API routes
app.use(`/${version}/buildings`, buildings)
app.use(`/${version}/courses`, courses)
app.use(`/${version}/departments`, departments)
app.use(`/${version}/news`, news)
app.use(`/${version}/sections`, sections)
app.use(`/${version}/textbooks`, textbooks)

app.get('/', (_, res) => {
  res.send(
    'Please use /v1 endpoint. For more information, visit https://qmulus.io')
})

// For automated status checks (load balancer heath checks)
app.get('/status', (_, res) => {
  // TODO: report more service details
  res.json({ message: 'Service is up!' })
})

// Error handlers
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  err.status = err.status || 500
  const error = { code: err.status, message: err.message }
  res.status(err.status).json({ error })
})

getApiTokenManager().preCacheApiTokenHashes()

export default { Server: app }
