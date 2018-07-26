import express from 'express'

import list from './routes/list'
import search from './routes/search'

import validator from '../../utils/validator'

const router = express.Router()

router.get('/',
  validator.limit,
  validator.offset,
  validator.sort,
  list,
)

router.get('/search',
  validator.query,
  validator.limit,
  validator.offset,
  validator.sort,
  search,
)

export default router
