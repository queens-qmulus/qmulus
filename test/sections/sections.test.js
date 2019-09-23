import test from 'ava'
import request from 'supertest'

import qmulus from '../../src/index'
import Section from '../../src/api/sections/model'
import sectionsData from './sectionsData.json'
import errors from '../'

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

// ~~~~~~~~~~ List Tests ~~~~~~~~~~
test.cb('/', t => {
  request(qmulus.Server)
    .get('/v1/sections')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(sectionsData.slice(0, 20)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Pagination
test.cb('/?limit=0', t => {
  request(qmulus.Server)
    .get('/v1/sections?limit=0')
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
    .get('/v1/sections?limit=101')
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
    .get('/v1/sections?limit=ten')
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
    .get('/v1/sections?limit=3')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(sectionsData.slice(0, 3)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?limit=65', t => {
  request(qmulus.Server)
    .get('/v1/sections?limit=65')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(sectionsData))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Offsetting
test.cb('/?offset=10', t => {
  request(qmulus.Server)
    .get('/v1/sections?offset=10')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(sectionsData.slice(10, 21)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?offset=20', t => {
  request(qmulus.Server)
    .get('/v1/sections?offset=20')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(sectionsData.slice(20, 21)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?offset=-18', t => {
  request(qmulus.Server)
    .get('/v1/sections?offset=-18')
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
    .get('/v1/sections?offset=twenty')
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
    .get('/v1/sections?offset=15&limit=5')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(sectionsData.slice(15, 20)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Sorting
test.cb('/?sort=-id', t => {
  request(qmulus.Server)
    .get('/v1/sections?limit=21&sort=-id')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(sectionsData.slice().reverse())
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?sort=+', t => {
  request(qmulus.Server)
    .get('/v1/sections?sort=+')
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
    .get('/v1/sections/non/existent/route')
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

/*
TODO(etenoch): fix this test.
// Section name search
test.cb('/search?q=Neuroscience', t => {
  request(qmulus.Server)
    .get('/v1/sections/search?q=Neuroscience')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(sectionsData.slice(8, 9).concat(sectionsData.slice(19, 20)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})
*/

/*
TODO(etenoch): fix this test.
// Section department search
test.cb('/search?q=LAW', t => {
  request(qmulus.Server)
    .get('/v1/sections/search?q=LAW')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(sectionsData.slice(2, 3).concat(sectionsData.slice(7, 8)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})
*/

test.cb('/search?q=', t => {
  request(qmulus.Server)
    .get('/v1/sections/search?q=')
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
    .get('/v1/sections/search?q=uh')
    .expect('Content-Type', /json/)
    .expect(422)
    .expect({ 'error': errors.search2 })
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

/*
TODO(etenoch): fix this test.
test.cb('/search?q=non-existent', t => {
  request(qmulus.Server)
    .get('/v1/sections/search?q=non-existent')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect('[]')
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})
*/

// ~~~~~~~~~~ ID Tests ~~~~~~~~~~
test.cb('/2018-WI-UO-M-PHIL-203', t => {
  request(qmulus.Server)
    .get('/v1/sections/2018-WI-UO-M-PHIL-203')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(sectionsData[15])
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/non-existent-id', t => {
  request(qmulus.Server)
    .get('/v1/sections/non-existent-id')
    .expect('Content-Type', /json/)
    .expect(404)
    .expect({ 'error': errors.getIdError('Section', 'ID') })
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
