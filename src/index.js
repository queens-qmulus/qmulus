import client from 'redis'
import compression from 'compression'
import express from 'express'
import helmet from 'helmet'
import limiter from 'express-limiter'
import mongoose from 'mongoose'
import winston from 'winston'

import buildings from './api/buildings'
import courses from './api/courses'
import departments from './api/departments'
import news from './api/news'
import sections from './api/sections'
import textbooks from './api/textbooks'

const test = process.argv.join().match('/ava/')
const URI = process.env.QMULUS_MONGO_URI || 'mongodb://localhost:27017/qmulus'
const redisClient = client.createClient()
const version = 'v1'

const app = express()
const rateLimiter = limiter(app, redisClient)

mongoose.connect(URI, { useNewUrlParser: true }, err => {
  if (err) throw new Error('Connection failed')
  if (!test) winston.info('Connected to database')
})

// API rate limiting
rateLimiter({
  path: '*',
  method: 'get',
  lookup: ['connection.remoteAddress'],
  total: 1000, // 1000 requests
  expire: 1000 * 60 * 60, // per hour
  onRateLimited: (req, res, next) => {
    next({ status: 429, message: 'API rate limit exceeded' })
  },
})

// Third-party middleware
app.use(helmet())
app.use(compression())

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
  res.status(err.status)
  const error = { code: err.status, message: err.message }

  res.json({ error: error })
})

export default { Server: app }
