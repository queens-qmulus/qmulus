import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import morgan from 'morgan'
// import apicache from 'apicache' // TODO: Remove after

import buildings from './api/buildings'
import courses from './api/courses'
import departments from './api/departments'
import news from './api/news'
import sections from './api/sections'
import textbooks from './api/textbooks'

import utils from './utils'
import logger from './utils/logger'

const app = express()
// const cache = apicache.middleware // TODO: Remove after
const test = process.argv.join().match('/ava/')
const { version, showAvailableUrls, checkRateLimit, rateLimiter } = utils
let URI = process.env.QMULUS_MONGO_URI || 'mongodb://localhost:27017/qmulus'

if (test) URI += '_test'

// MongoDB connection
mongoose.connect(URI, { useNewUrlParser: true }, err => {
  if (err) throw new Error('Connection failed')
  if (!test) logger.info('Connected to database')
})

// Third-party middleware
app.use(helmet())
app.use(compression())
// app.use(cache('5 minutes')) // TODO: Remove after
app.use(rateLimiter)
if (!test) app.use(morgan(logger.morganFormat, {stream: logger.winstonStream}))

// Informational API endpoints
app.get(`/${version}`, showAvailableUrls)
app.get(`/${version}/rate_limit`, checkRateLimit)

// API routes
app.use(`/${version}/buildings`, buildings)
app.use(`/${version}/courses`, courses)
app.use(`/${version}/departments`, departments)
app.use(`/${version}/news`, news)
app.use(`/${version}/sections`, sections)
app.use(`/${version}/textbooks`, textbooks)

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

export default { Server: app }