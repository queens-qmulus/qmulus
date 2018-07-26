import test from 'ava'
import request from 'supertest'

import qmulus from '../../src/index'
import Department from '../../src/api/departments/model'
import departmentsData from './departmentsData.json'
import errors from '../'

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

// ~~~~~~~~~~ List Tests ~~~~~~~~~~
test.cb('/', t => {
  request(qmulus.Server)
    .get('/v1/departments')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(departmentsData.slice(0, 20)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Pagination
test.cb('/?limit=0', t => {
  request(qmulus.Server)
    .get('/v1/departments?limit=0')
    .expect('Content-Type', /json/)
    .expect(422)
    .expect({ 'error': errors.limit })
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?limit=101', t => {
  request(qmulus.Server)
    .get('/v1/departments?limit=101')
    .expect('Content-Type', /json/)
    .expect(422)
    .expect({ 'error': errors.limit })
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?limit=ten', t => {
  request(qmulus.Server)
    .get('/v1/departments?limit=ten')
    .expect('Content-Type', /json/)
    .expect(422)
    .expect({ 'error': errors.limit })
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?limit=3', t => {
  request(qmulus.Server)
    .get('/v1/departments?limit=3')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(departmentsData.slice(0, 3)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?limit=65', t => {
  request(qmulus.Server)
    .get('/v1/departments?limit=65')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(departmentsData))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Offsetting
test.cb('/?offset=10', t => {
  request(qmulus.Server)
    .get('/v1/departments?offset=10')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(departmentsData.slice(10, 21)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?offset=20', t => {
  request(qmulus.Server)
    .get('/v1/departments?offset=20')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(departmentsData.slice(20, 21)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?offset=-18', t => {
  request(qmulus.Server)
    .get('/v1/departments?offset=-18')
    .expect('Content-Type', /json/)
    .expect(422)
    .expect({ 'error': errors.offset })
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?offset=twenty', t => {
  request(qmulus.Server)
    .get('/v1/departments?offset=twenty')
    .expect('Content-Type', /json/)
    .expect(422)
    .expect({ 'error': errors.offset })
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Pagination & Offsetting
test.cb('/?offset=15&limit=5', t => {
  request(qmulus.Server)
    .get('/v1/departments?offset=15&limit=5')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(departmentsData.slice(15, 20)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Sorting
test.cb('/?sort=-code', t => {
  request(qmulus.Server)
    .get('/v1/departments?limit=21&sort=-code')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(departmentsData.slice().reverse())
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?sort=+', t => {
  request(qmulus.Server)
    .get('/v1/departments?sort=+')
    .expect('Content-Type', /json/)
    .expect(422)
    .expect({ 'error': errors.sort })
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Non-Existing Route
test.cb('/non-existent-route', t => {
  request(qmulus.Server)
    .get('/v1/departments/non/existent/route')
    .expect('Content-Type', /json/)
    .expect(404)
    .expect({ 'error': {'code': 404, message: 'Not Found'} })
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// ~~~~~~~~~~ Search Tests ~~~~~~~~~~

// Department code search
test.cb('/search?q=MEDS', t => {
  request(qmulus.Server)
    .get('/v1/departments/search?q=MEDS')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(departmentsData.slice(10, 11))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Department name search
test.cb('/search?q=Pathology', t => {
  request(qmulus.Server)
    .get('/v1/departments/search?q=Pathology')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(departmentsData.slice(11, 12))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/search?q=', t => {
  request(qmulus.Server)
    .get('/v1/departments/search?q=')
    .expect('Content-Type', /json/)
    .expect(422)
    .expect({ 'error': errors.search1 })
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/search?q=uh', t => {
  request(qmulus.Server)
    .get('/v1/departments/search?q=uh')
    .expect('Content-Type', /json/)
    .expect(422)
    .expect({ 'error': errors.search2 })
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/search?q=non-existent', t => {
  request(qmulus.Server)
    .get('/v1/departments/search?q=non-existent')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect('[]')
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// ~~~~~~~~~~ ID Tests ~~~~~~~~~~
test.cb('/MBUS', t => {
  request(qmulus.Server)
    .get('/v1/departments/MBUS')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(departmentsData[9])
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/non-existent-id', t => {
  request(qmulus.Server)
    .get('/v1/departments/non-existent-id')
    .expect('Content-Type', /json/)
    .expect(404)
    .expect({ 'error': errors.getIdError('Department', 'code') })
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// test.cb.after('cleanup', t => {
//   Department.remove({}, err => {
//     if (err) t.fail(err.message)
//     t.end()
//   })
// })
