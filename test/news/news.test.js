import test from 'ava'
import request from 'supertest'

import qmulus from '../../src/index'
import News from '../../src/api/news/model'
import newsData from './newsData.json'

// Seed DB with sample data
test.cb.before('setup', t => {
  News.remove({}, err => {
    if (err) t.fail(err.message)

    News.insertMany(newsData, err => {
      if (err) t.fail(err.message)
      t.end()
    })
  })
})

test.cb('/', t => {
  request(qmulus.Server)
    .get('/v1/news')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(newsData))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/abc', t => {
  request(qmulus.Server)
    .get('/1.0/news/abc')
    .expect('Content-Type', /json/)
    .expect(404)
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb.after('cleanup', t => {
  News.remove({}, err => {
    if (err) t.fail(err.message)
    t.end()
  })
})
