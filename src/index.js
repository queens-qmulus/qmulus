import express from 'express'
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

mongoose.connect(URI, { useNewUrlParser: true }, err => {
  if (err) throw new Error('Connection failed')
  if (!test) winston.info('Connected to database')
})

const app = express()
const version = 'v1'

app.use(`/${version}/buildings`, buildings)
app.use(`/${version}/courses`, courses)
app.use(`/${version}/departments`, departments)
app.use(`/${version}/news`, news)
app.use(`/${version}/sections`, sections)
app.use(`/${version}/textbooks`, textbooks)

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

// app.listen(3000, () => {
//   winston.info(`Server running at http://localhost:3000`)
// })

export default { Server: app }
