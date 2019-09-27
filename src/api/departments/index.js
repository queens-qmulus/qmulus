import express from 'express'

import list from './routes/list'
import search from './routes/search'
import show from './routes/show'

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

/**
 * @api {get} /departments/:code Request specifc department
 * @apiName GetDepartment
 * @apiGroup Departments
 *
 * @apiParam {String} code Department code // TODO: provide code format example
 *
 * @apiSuccess {String} code Department code.
 * @apiSuccess {String} name Department name.
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "code": "ASC",
 *      "name": "Arts and Sciences"
 *    }
 *
 */
router.get('/:code', show)

export default router
