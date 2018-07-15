import test from 'ava'
import request from 'supertest'

import qmulus from '../../src/index'
import Textbook from '../../src/api/textbooks/model'
import textbooksData from './textbooksData.json'

// Seed DB with sample data
test.cb.before('setup', t => {
  Textbook.remove({}, err => {
    if (err) t.fail(err.message)

    Textbook.insertMany(textbooksData, err => {
      if (err) t.fail(err.message)
      t.end()
    })
  })
})

test.cb('/', t => {
  request(qmulus.Server)
    .get('/v1/textbooks')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(textbooksData))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/abc', t => {
  request(qmulus.Server)
    .get('/1.0/textbooks/abc')
    .expect('Content-Type', /json/)
    .expect(404)
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb.after('cleanup', t => {
  Textbook.remove({}, err => {
    if (err) t.fail(err.message)
    t.end()
  })
})
