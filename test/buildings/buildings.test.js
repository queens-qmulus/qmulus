import test from 'ava'
import request from 'supertest'

import qmulus from '../../src/index'
import Building from '../../src/api/buildings/model'
import buildingsData from './buildingsData.json'

// Seed DB with sample data
test.cb.before('setup', t => {
  Building.remove({}, err => {
    if (err) t.fail(err.message)

    Building.insertMany(buildingsData, err => {
      if (err) t.fail(err.message)
      t.end()
    })
  })
})

test.cb('/', t => {
  request(qmulus.Server)
    .get('/v1/buildings')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(buildingsData))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/abc', t => {
  request(qmulus.Server)
    .get('/1.0/buildings/abc')
    .expect('Content-Type', /json/)
    .expect(404)
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb.after('cleanup', t => {
  Building.remove({}, err => {
    if (err) t.fail(err.message)
    t.end()
  })
})
