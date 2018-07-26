import test from 'ava'
import request from 'supertest'

import qmulus from '../../src/index'
import Course from '../../src/api/courses/model'
import coursesData from './coursesData.json'
import errors from '../'

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

// ~~~~~~~~~~ List Tests ~~~~~~~~~~
test.cb('/', t => {
  request(qmulus.Server)
    .get('/v1/courses')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(coursesData.slice(0, 20)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Pagination
test.cb('/?limit=0', t => {
  request(qmulus.Server)
    .get('/v1/courses?limit=0')
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
    .get('/v1/courses?limit=101')
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
    .get('/v1/courses?limit=ten')
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
    .get('/v1/courses?limit=3')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(coursesData.slice(0, 3)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?limit=65', t => {
  request(qmulus.Server)
    .get('/v1/courses?limit=65')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(coursesData))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Offsetting
test.cb('/?offset=10', t => {
  request(qmulus.Server)
    .get('/v1/courses?offset=10')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(coursesData.slice(10, 21)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?offset=20', t => {
  request(qmulus.Server)
    .get('/v1/courses?offset=20')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(coursesData.slice(20, 21)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?offset=-18', t => {
  request(qmulus.Server)
    .get('/v1/courses?offset=-18')
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
    .get('/v1/courses?offset=twenty')
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
    .get('/v1/courses?offset=15&limit=5')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(coursesData.slice(15, 20)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Sorting
test.cb('/?sort=-id', t => {
  request(qmulus.Server)
    .get('/v1/courses?limit=21&sort=-id')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(coursesData.slice().reverse())
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?sort=+', t => {
  request(qmulus.Server)
    .get('/v1/courses?sort=+')
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
    .get('/v1/courses/non/existent/route')
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

// Course department search
test.cb('/search?q=MPA', t => {
  request(qmulus.Server)
    .get('/v1/courses/search?q=MPA')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(coursesData.slice(13, 15))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Course name & description search
test.cb('/search?q=budget', t => {
  request(qmulus.Server)
    .get('/v1/courses/search?q=budget')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(coursesData.slice(1, 2).concat(coursesData.slice(14, 15)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/search?q=', t => {
  request(qmulus.Server)
    .get('/v1/courses/search?q=')
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
    .get('/v1/courses/search?q=uh')
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
    .get('/v1/courses/search?q=non-existent')
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
test.cb('/SURP-898', t => {
  request(qmulus.Server)
    .get('/v1/courses/SURP-898')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(coursesData[19])
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/non-existent-id', t => {
  request(qmulus.Server)
    .get('/v1/courses/non-existent-id')
    .expect('Content-Type', /json/)
    .expect(404)
    .expect({ 'error': errors.getIdError('Course', 'ID') })
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
