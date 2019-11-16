import express from 'express'

import list from './routes/list'
import search from './routes/search'
import show from './routes/show'
import Department from './model'

import { createGenericQueryParser } from '../../utils/genericQuery'
import validator from '../../utils/validator'
import { tokenValidator } from '../../utils/apiTokenManager'

const router = express.Router()

// TODO: docs for query endpoint
router.get('/query',
  tokenValidator,
  validator.limit,
  validator.offset,
  validator.sort,
  createGenericQueryParser(Department),
)

/**
 * @api {get} /departments/ List Departments
 * @apiName ListDepartment
 * @apiGroup Departments
 *
 * @apiUse QmulusGETEndpoint
 * @apiUse QmulusLimitOffsetSort
 *
 * @apiExample {curl} Example usage:
 *   curl https://api.qmulus.io/v1/departments/?limit=50&sort=-name&token=<...>
 *
 * @apiSuccess {Object[]} department Array of `Department` objects
 * @apiSuccess {string} department.id `Department` id
 * @apiSuccess {string} department.code `Department` code
 * @apiSuccess {string} department.name `Department` name
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "id": "AGHE",
 *        "code": "AGHE",
 *        "name": "Aging and Health"
 *      },
 *      {
 *        "id": "ANAT",
 *        "code": "ANAT",
 *        "name": "Anatomy and Cell Biology"
 *      },
 *      ...
 *    ]
 *
 */
router.get('/',
  tokenValidator,
  validator.limit,
  validator.offset,
  validator.sort,
  list,
)

/**
 * @api {get} /departments/search Search Departments
 * @apiName SearchDepartment
 * @apiGroup Departments
 *
 * @apiUse QmulusGETEndpoint
 * @apiUse QmulusLimitOffsetSort
 *
 * @apiParam {string} q Full text search string query
 *
 * @apiSuccess {Object[]} department Array of `Department` objects
 * @apiSuccess {string} department.id `Department` id
 * @apiSuccess {string} department.code `Department` code
 * @apiSuccess {string} department.name `Department` name
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "id": "CMPE",
 *        "code": "CMPE",
 *        "name": "Computing in Engineering"
 *      },
 *      {
 *        "id": "COCA",
 *        "code": "COCA",
 *        "name": "Computing & the Creative Arts"
 *      },
 *      ...
 *    ]
 *
 */
router.get('/search',
  tokenValidator,
  validator.query,
  validator.limit,
  validator.offset,
  validator.sort,
  search,
)

/**
 * @api {get} /departments/:id Get specifc Department
 * @apiName GetDepartment
 * @apiGroup Departments
 *
 * @apiUse QmulusGETEndpoint
 *
 * @apiParam {string} :id `Department` id
 *
 * @apiSuccess {string} id `Department` id
 * @apiSuccess {string} code `Department` code
 * @apiSuccess {string} name `Department` name
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "id": "CISC",
 *      "code": "CISC",
 *      "name": "ComputingInformation Science"
 *    }
 *
 */
router.get('/:id', tokenValidator, show)

export default router
