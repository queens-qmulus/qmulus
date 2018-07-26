import test from 'ava'
import request from 'supertest'

import qmulus from '../../src/index'
import News from '../../src/api/news/model'
import newsData from './newsData.json'
import errors from '../'

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

// ~~~~~~~~~~ List Tests ~~~~~~~~~~
test.cb('/', t => {
  request(qmulus.Server)
    .get('/v1/news')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(newsData.slice(0, 20)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Pagination
test.cb('/?limit=0', t => {
  request(qmulus.Server)
    .get('/v1/news?limit=0')
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
    .get('/v1/news?limit=101')
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
    .get('/v1/news?limit=ten')
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
    .get('/v1/news?limit=3')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(newsData.slice(0, 3)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?limit=65', t => {
  request(qmulus.Server)
    .get('/v1/news?limit=65')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(newsData))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Offsetting
test.cb('/?offset=10', t => {
  request(qmulus.Server)
    .get('/v1/news?offset=10')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(newsData.slice(10, 21)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?offset=20', t => {
  request(qmulus.Server)
    .get('/v1/news?offset=20')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(newsData.slice(20, 21)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?offset=-18', t => {
  request(qmulus.Server)
    .get('/v1/news?offset=-18')
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
    .get('/v1/news?offset=twenty')
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
    .get('/v1/news?offset=15&limit=5')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(newsData.slice(15, 20)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?sort=published', t => {
  request(qmulus.Server)
    .get('/v1/news?limit=21&sort=published')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(newsData.slice().reverse())
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?sort=+', t => {
  request(qmulus.Server)
    .get('/v1/news?sort=+')
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
    .get('/v1/news/non/existent/route')
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

// News authors search
test.cb('/search?q=Craig', t => {
  request(qmulus.Server)
    .get('/v1/news/search?q=Craig')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(newsData.slice(2, 4))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/search?q=', t => {
  request(qmulus.Server)
    .get('/v1/news/search?q=')
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
    .get('/v1/news/search?q=uh')
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
    .get('/v1/news/search?q=non-existent')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect('[]')
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
