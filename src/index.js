import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import mongoose from 'mongoose'
import morgan from 'morgan'

import buildings from './api/buildings'
import courses from './api/courses'
import departments from './api/departments'
import news from './api/news'
import sections from './api/sections'
import textbooks from './api/textbooks'

import utils from './utils'
import logger from './utils/logger'

const app = express()
const test = process.argv.join().match('/ava/')
const URI = process.env.QMULUS_MONGO_URI || 'mongodb://localhost:27017/qmulus'
const { cache, rateLimiter, checkRateLimit, version, morganFormat } = utils

// MongoDB connection
mongoose.connect(URI, { useNewUrlParser: true }, err => {
  if (err) throw new Error('Connection failed')
  if (!test) logger.info('Connected to database')
})

// Third-party middleware
app.use(helmet())
app.use(compression())
app.use(morgan(morganFormat, { stream: logger.stream }))
app.use(rateLimiter)

// API routes
app.use(`/${version}/buildings`, cache(), buildings)
app.use(`/${version}/courses`, cache(), courses)
app.use(`/${version}/departments`, cache(), departments)
app.use(`/${version}/news`, cache(), news)
app.use(`/${version}/sections`, cache(), sections)
app.use(`/${version}/textbooks`, cache(), textbooks)
app.get(`/${version}/rate_limit`, checkRateLimit)

// Error handlers
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  err.status = err.status || 500
  res.status(err.status)
  const error = { code: err.status, message: err.message }

  res.json({ error: error })
})

export default { Server: app }
