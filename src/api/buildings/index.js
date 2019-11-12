import express from 'express'

import list from './routes/list'
import search from './routes/search'
import show from './routes/show'

import validator from '../../utils/validator'
import { tokenValidator } from '../../utils/apiTokenManager'

const router = express.Router()

/* eslint-disable */
/**
 * @api {get} /buildings List Buildings
 * @apiName ListBuildings
 * @apiGroup Buildings
 *
 * @apiUse QmulusGETEndpoint
 * @apiUse QmulusLimitOffsetSort
 *
 * @apiExample {curl} Example usage:
 *   curl https://api.qmulus.io/v1/buildings?limit=100&offset=200&limit=100&&token=<...>
 *
 * @apiSuccess {Object[]} building Array of `Building` objects.
 *   See [object definition here](#api-Buildings-GetBuilding)
 *
 */
/* eslint-enable */
router.get('/',
  tokenValidator,
  validator.limit,
  validator.offset,
  validator.sort,
  list,
)

/* eslint-disable */
/**
 * @api {get} /buildings/search Search Buildings
 * @apiName SearchBuildings
 * @apiGroup Buildings
 *
 * @apiUse QmulusGETEndpoint
 * @apiUse QmulusLimitOffsetSort
 *
 * @apiParam {string} q Full text search string query
 *
 * @apiExample {curl} Example usage:
 *   curl https://api.qmulus.io/v1/buildings/search?q=goodwin&limit=100&token=<...>
 *
 * @apiSuccess {Object[]} departments Array of found `Building` objects.
 *   See [object definition here](#api-Buildings-GetBuilding)
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
 * @api {get} /buildings/:id Get specifc Building
 * @apiName GetBuilding
 * @apiGroup Buildings
 *
 * @apiUse QmulusGETEndpoint
 *
 * @apiParam {string} :id `Building` id
 *
 * @apiSuccess {string} id `Building` id
 * @apiSuccess {string} code `Building` code. (Mostly a non-sensical building "code" listed by Queen's on their campus map)
 * @apiSuccess {Boolean} accessibility Whether building is accessible.
 * @apiSuccess {string} name First line of street address.
 * @apiSuccess {number} latitude Geographic coordinate
 * @apiSuccess {number} longitude Geographic coordinate
 * @apiSuccess {string} campus Campus location. {main, west, isabel}
 * @apiSuccess {Number[][]} polygon An array of polygon coordinates that draw out the shape of the building on a xy plane. (These are not geo latlon coordinates)
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "id": "goodwin",
 *      "code": "GOO GOODWN",
 *      "accessibility": true,
 *      "name": "Goodwin Hall",
 *      "address": "25 Union Street",
 *      "latitude": 44.227872,
 *      "longitude": -76.492363,
 *      "campus": "main",
 *      "polygon": [[652,234], [651,239], [649,239], ...]
 *    }
 *
 */
/* eslint-enable */
router.get('/:id', tokenValidator, show)

export default router
