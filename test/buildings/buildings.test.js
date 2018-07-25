import test from 'ava'
import request from 'supertest'

import qmulus from '../../src/index'
import Building from '../../src/api/buildings/model'
import buildingsData from './buildingsData.json'

const errLimit = { code: 422, message: 'Limit must be between 1 and 100.' }
const errOffset = { code: 422, message: 'Offset must be positive integer.' }
const errSort = { code: 422, message: 'Sort length must be greater than 1.' }
const errSearch1 = { code: 422, message: 'Query must be specified.' }
const errSearch2 = { code: 422, message: 'Query length must be more than 2.' }

const errID = {
  code: 404,
  message: 'Building with ID \'non-existent-id\' does not exist.',
}

// ~~~~~~~~~~ Setup ~~~~~~~~~~
test.cb.before('setup', t => {
  // Seed DB with sample data
  Building.remove({}, err => {
    if (err) t.fail(err.message)

    Building.insertMany(buildingsData, err => {
      if (err) t.fail(err.message)
      t.end()
    })
  })
})

// ~~~~~~~~~~ List Tests ~~~~~~~~~~
test.cb('/', t => {
  request(qmulus.Server)
    .get('/v1/buildings')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(buildingsData.slice(0, 20)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Pagination
test.cb('/?limit=0', t => {
  request(qmulus.Server)
    .get('/v1/buildings?limit=0')
    .expect('Content-Type', /json/)
    .expect(422)
    .expect({ 'error': errLimit })
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?limit=101', t => {
  request(qmulus.Server)
    .get('/v1/buildings?limit=0')
    .expect('Content-Type', /json/)
    .expect(422)
    .expect({ 'error': errLimit })
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?limit=ten', t => {
  request(qmulus.Server)
    .get('/v1/buildings?limit=ten')
    .expect('Content-Type', /json/)
    .expect(422)
    .expect({ 'error': errLimit })
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?limit=3', t => {
  request(qmulus.Server)
    .get('/v1/buildings?limit=3')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(buildingsData.slice(0, 3)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?limit=65', t => {
  request(qmulus.Server)
    .get('/v1/buildings?limit=65')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(buildingsData))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Offsetting
test.cb('/?offset=10', t => {
  request(qmulus.Server)
    .get('/v1/buildings?offset=10')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(buildingsData.slice(10, 21)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?offset=20', t => {
  request(qmulus.Server)
    .get('/v1/buildings?offset=20')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(buildingsData.slice(20, 21)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?offset=-18', t => {
  request(qmulus.Server)
    .get('/v1/buildings?offset=-18')
    .expect('Content-Type', /json/)
    .expect(422)
    .expect({ 'error': errOffset })
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?offset=twenty', t => {
  request(qmulus.Server)
    .get('/v1/buildings?offset=twenty')
    .expect('Content-Type', /json/)
    .expect(422)
    .expect({ 'error': errOffset })
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Pagination & Offsetting
test.cb('/?offset=15&limit=5', t => {
  request(qmulus.Server)
    .get('/v1/buildings?offset=15&limit=5')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(buildingsData.slice(15, 20)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Sorting
test.cb('/?sort=-id', t => {
  request(qmulus.Server)
    .get('/v1/buildings?limit=21&sort=-id')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(buildingsData.slice().reverse())
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?sort=+', t => {
  request(qmulus.Server)
    .get('/v1/buildings?sort=+')
    .expect('Content-Type', /json/)
    .expect(422)
    .expect({ 'error': errSort })
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Non-Existing Route
test.cb('/non-existent-route', t => {
  request(qmulus.Server)
    .get('/v1/buildings/non/existent/route')
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
test.cb('/search?q=Walter Light', t => {
  request(qmulus.Server)
    .get('/v1/buildings/search?q=Walter%20Light')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(buildingsData.slice(20))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/search?q=west', t => {
  request(qmulus.Server)
    .get('/v1/buildings/search?q=west')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(buildingsData.slice(4, 5).concat(buildingsData.slice(10, 13)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/search?q=', t => {
  request(qmulus.Server)
    .get('/v1/buildings/search?q=')
    .expect('Content-Type', /json/)
    .expect(422)
    .expect({ 'error': errSearch1 })
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/search?q=uh', t => {
  request(qmulus.Server)
    .get('/v1/buildings/search?q=uh')
    .expect('Content-Type', /json/)
    .expect(422)
    .expect({ 'error': errSearch2 })
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/search?q=non-existent', t => {
  request(qmulus.Server)
    .get('/v1/buildings/search?q=non-existent')
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
test.cb('/douglas', t => {
  request(qmulus.Server)
    .get('/v1/buildings/douglas')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(buildingsData[5])
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/non-existent-id', t => {
  request(qmulus.Server)
    .get('/v1/buildings/non-existent-id')
    .expect('Content-Type', /json/)
    .expect(404)
    .expect({ 'error': errID })
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// ~~~~~~~~~~ Cleanup ~~~~~~~~~~
test.cb.after('cleanup', t => {
  Building.remove({}, err => {
    if (err) t.fail(err.message)
    t.end()
  })
})
