import test from 'ava'
import request from 'supertest'

import qmulus from '../../src/index'
import Course from '../../src/api/courses/model'
import coursesData from './coursesData.json'

// Seed DB with sample data
test.cb.before('setup', t => {
  Course.remove({}, err => {
    if (err) t.fail(err.message)

    Course.insertMany(coursesData, err => {
      if (err) t.fail(err.message)
      t.end()
    })
  })
})

test.cb('/', t => {
  request(qmulus.Server)
    .get('/v1/courses')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(coursesData))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/abc', t => {
  request(qmulus.Server)
    .get('/1.0/courses/abc')
    .expect('Content-Type', /json/)
    .expect(404)
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb.after('cleanup', t => {
  Course.remove({}, err => {
    if (err) t.fail(err.message)
    t.end()
  })
})
