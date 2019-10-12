import express from 'express'

import list from './routes/list'
import search from './routes/search'
import show from './routes/show'

import validator from '../../utils/validator'
import { tokenValidator } from '../../utils/apiTokenManager'

const router = express.Router()

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

router.get('/:id', tokenValidator, show)

export default router
