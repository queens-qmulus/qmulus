import express from 'express'

import list from './routes/list'
import search from './routes/search'
import show from './routes/show'
import Textbook from './model'

import { createGenericQueryParser } from '../../utils/genericQuery'
import validator from '../../utils/validator'
import { tokenValidator } from '../../utils/apiTokenManager'

const router = express.Router()

/**
 * @api {get} /textbooks/query Query Textbooks
 * @apiName QueryTextbooks
 * @apiGroup Textbooks
 *
 * @apiUse QmulusGETEndpoint
 * @apiUse QmulusLimitOffsetSort
 *
 * @apiParam {string} [isbn_10] 10 digit ISBN
 * @apiParam {string} [isbn_13] 13 digit ISBN
 * @apiParam {string} [title] Textbook title
 * @apiParam {number} [price_new] Cost to purchase new
 * @apiParam {number} [price_old] Cost to purchase used (if available)
 * @apiParam {string=REQUIRED, RECOMMENDED} [status] Status of book for course
 *
 * @apiSuccess {Object[]} textbook Array of `Textbook` objects.
 *   See [object definition here](#api-Textbooks-GetTextbook)
 *
 */
router.get('/query',
  tokenValidator,
  validator.limit,
  validator.offset,
  validator.sort,
  createGenericQueryParser(Textbook),
)

/**
 * @api {get} /textbooks List Textbooks
 * @apiName ListTextbooks
 * @apiGroup Textbooks
 *
 * @apiUse QmulusGETEndpoint
 * @apiUse QmulusLimitOffsetSort
 *
 * @apiSuccess {Object[]} textbook Array of `Textbook` objects.
 *   See [object definition here](#api-Textbooks-GetTextbook)
 *
 */
router.get('/',
  tokenValidator,
  validator.limit,
  validator.offset,
  validator.sort,
  list,
)

/* eslint-disable */
/**
 * @api {get} /textbooks/search Search Textbooks
 * @apiName SearchTextbooks
 * @apiGroup Textbooks
 *
 * @apiUse QmulusGETEndpoint
 * @apiUse QmulusLimitOffsetSort
 *
 * @apiParam {string} q Full text search string query
 *
 * @apiExample {curl} Example usage:
 *   curl https://api.qmulus.io/v1/textbooks/search?q=CISC&sort=-title&token=<...>
 *
 * @apiSuccess {Object[]} departments Array of found `Textbook` objects.
 *   See [object definition here](#api-Textbooks-GetTextbook)
 *
 */
/* eslint-enable */
router.get('/search',
  tokenValidator,
  validator.query,
  validator.limit,
  validator.offset,
  validator.sort,
  search,
)

/* eslint-disable */
/**
 * @api {get} /textbooks/:id Get specifc Textbook
 * @apiName GetTextbook
 * @apiGroup Textbooks
 *
 * @apiUse QmulusGETEndpoint
 *
 * @apiParam {string} :id `Textbook` id
 *
 * @apiSuccess {string} id `Textbook` id
 * @apiSuccess {String[]} authors List of author names.
 * @apiSuccess {string} isbn_10 10 digit ISBN
 * @apiSuccess {string} isbn_13 13 digit ISBN
 * @apiSuccess {string} title Textbook title
 * @apiSuccess {string} [image] Book cover image link
 * @apiSuccess {number} price_new Cost to purchase new
 * @apiSuccess {number} [price_old] Cost to purchase used (if available)
 * @apiSuccess {string=REQUIRED, RECOMMENDED} status Status of book for course
 * @apiSuccess {Object[]} courses Array of courses that require/recommend this book
 * @apiSuccess {String} course.year School year
 * @apiSuccess {String=Fall,Winter} course.term
 * @apiSuccess {String} course.department Can be used to reference `Course`.`department` field
 * @apiSuccess {String} course.course_code Can be used to reference `Course`.`course_code` field
 * @apiSuccess {String} course.url Queen's bookstore search url
 * @apiSuccess {String} course.instructor Course instructor
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "authors": [
 *        "Dingel"
 *      ],
 *      "id": "88880095043",
 *      "isbn_10": null,
 *      "isbn_13": "88880095043",
 *      "title": "CISC/CMPE422 Course Reader",
 *      "image": "",
 *      "price_new": 15.25,
 *      "price_used": null,
 *      "status": "REQUIRED",
 *      "courses": [
 *        {
 *          "year": "2019",
 *          "term": "Fall",
 *          "department": "CISC",
 *          "course_code": "422",
 *          "url": "https://www.campusbookstore.com/textbooks/search-engine/results?Course=CISCB04242",
 *          "instructor": "Juergen Dingel"
 *        },
 *        {
 *          "year": "2019",
 *          "term": "Fall",
 *          "department": "CMPE",
 *          "course_code": "422",
 *          "url": "https://www.campusbookstore.com/textbooks/search-engine/results?Course=CMPEB04243",
 *          "instructor": "Juergen Dingel"
 *        }
 *      ]
 *    }
 */
/* eslint-enable */
router.get('/:id', tokenValidator, show)

export default router
