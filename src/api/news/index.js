import express from 'express'

import list from './routes/list'
import search from './routes/search'

import validator from '../../utils/validator'
import { tokenValidator } from '../../utils/apiTokenManager'

const IS_TEST = process.argv.join().match('/ava/')

const router = express.Router()

if (IS_TEST) {
  // TODO: re-enable news once we have the datasets
  router.get('/',
    tokenValidator,
    validator.limit,
    validator.offset,
    validator.sort,
    list,
  )

  router.get('/search',
    tokenValidator,
    validator.query,
    validator.limit,
    validator.offset,
    validator.sort,
    search,
  )
}

// TODO: route for getting article by id

export default router
