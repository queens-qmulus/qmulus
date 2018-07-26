import test from 'ava'
import request from 'supertest'

import qmulus from '../../src/index'
import Textbook from '../../src/api/textbooks/model'
import textbooksData from './textbooksData.json'
import errors from '../'

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

// ~~~~~~~~~~ List Tests ~~~~~~~~~~
test.cb('/', t => {
  request(qmulus.Server)
    .get('/v1/textbooks')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(textbooksData.slice(0, 20)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Pagination
test.cb('/?limit=0', t => {
  request(qmulus.Server)
    .get('/v1/textbooks?limit=0')
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
    .get('/v1/textbooks?limit=101')
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
    .get('/v1/textbooks?limit=ten')
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
    .get('/v1/textbooks?limit=3')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(textbooksData.slice(0, 3)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?limit=65', t => {
  request(qmulus.Server)
    .get('/v1/textbooks?limit=65')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(textbooksData))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Offsetting
test.cb('/?offset=10', t => {
  request(qmulus.Server)
    .get('/v1/textbooks?offset=10')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(textbooksData.slice(10, 21)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?offset=20', t => {
  request(qmulus.Server)
    .get('/v1/textbooks?offset=20')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(textbooksData.slice(20, 21)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?offset=-18', t => {
  request(qmulus.Server)
    .get('/v1/textbooks?offset=-18')
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
    .get('/v1/textbooks?offset=twenty')
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
    .get('/v1/textbooks?offset=15&limit=5')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(JSON.stringify(textbooksData.slice(15, 20)))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Sorting
test.cb('/?sort=-isbn_13', t => {
  request(qmulus.Server)
    .get('/v1/textbooks?limit=21&sort=-isbn_13')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(textbooksData.slice().reverse())
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/?sort=+', t => {
  request(qmulus.Server)
    .get('/v1/textbooks?sort=+')
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
    .get('/v1/textbooks/non/existent/route')
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

// Textbook title search
test.cb('/search?q=Ear Training and Sight Singing', t => {
  request(qmulus.Server)
    .get('/v1/textbooks/search?q=Ear Training and Sight Singing')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(textbooksData.slice(10, 11))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

// Textbook author search
test.cb('/search?q=Abelson', t => {
  request(qmulus.Server)
    .get('/v1/textbooks/search?q=Abelson')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(textbooksData.slice(13, 14))
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/search?q=', t => {
  request(qmulus.Server)
    .get('/v1/textbooks/search?q=')
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
    .get('/v1/textbooks/search?q=uh')
    .expect('Content-Type', /json/)
    .expect(422)
    .expect({ 'error': errors.search2 })
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/search?q=nonexistent', t => {
  request(qmulus.Server)
    .get('/v1/textbooks/search?q=nonexistent')
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
test.cb('/9780134092669', t => {
  request(qmulus.Server)
    .get('/v1/textbooks/9780134092669')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect(textbooksData[6])
    .end((err, res) => {
      if (err) t.fail(err.message)
      t.pass()
      t.end()
    })
})

test.cb('/non-existent-id', t => {
  request(qmulus.Server)
    .get('/v1/textbooks/non-existent-id')
    .expect('Content-Type', /json/)
    .expect(404)
    .expect({ 'error': errors.getIdError('Textbook', 'ISBN') })
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
