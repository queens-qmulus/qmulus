import test from 'ava'
import request from 'supertest'

import qmulus from '../../src/index'
import Department from '../../src/api/departments/model'
import departmentsData from './departmentsData.json'

// Seed DB with sample data
test.cb.before('setup', t => {
  Department.remove({}, err => {
    if (err) t.fail(err.message)

    Department.insertMany(departmentsData, err => {
      if (err) t.fail(err.message)
      t.end()
    })
  })
})

test.cb('/', t => {
  request(qmulus.Server)
    .get('/v1/departments')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(departmentsData))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/abc', t => {
  request(qmulus.Server)
    .get('/1.0/departments/abc')
    .expect('Content-Type', /json/)
    .expect(404)
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb.after('cleanup', t => {
  Department.remove({}, err => {
    if (err) t.fail(err.message)
    t.end()
  })
})
