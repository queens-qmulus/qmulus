import test from 'ava'
import request from 'supertest'

import qmulus from '../../src/index'
import Section from '../../src/api/sections/model'
import sectionsData from './sectionsData.json'

// Seed DB with sample data
test.cb.before('setup', t => {
  Section.remove({}, err => {
    if (err) t.fail(err.message)

    Section.insertMany(sectionsData, err => {
      if (err) t.fail(err.message)
      t.end()
    })
  })
})

test.cb('/', t => {
  request(qmulus.Server)
    .get('/v1/sections')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(sectionsData))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/abc', t => {
  request(qmulus.Server)
    .get('/1.0/sections/abc')
    .expect('Content-Type', /json/)
    .expect(404)
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb.after('cleanup', t => {
  Section.remove({}, err => {
    if (err) t.fail(err.message)
    t.end()
  })
})
