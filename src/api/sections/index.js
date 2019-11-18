import express from 'express'

import list from './routes/list'
import search from './routes/search'
import show from './routes/show'
import Section from './model'

import { createGenericQueryParser } from '../../utils/genericQuery'
import validator from '../../utils/validator'
import { tokenValidator } from '../../utils/apiTokenManager'

const router = express.Router()

/* eslint-disable */
/**
 * @api {get} /sections/query Query Sections
 * @apiName QuerySections
 * @apiGroup Sections
 * @apiDescription The query endpoint can be used to find records by a specific field. For example, with `sections/query` you can
 * fetch all `Section`s` for a specific `Course` or all sections that happen in the fall of a specific year.
 *
 * @apiUse QmulusGETEndpoint
 * @apiUse QmulusLimitOffsetSort
 *
 * @apiExample {curl} Example usage:
 *   curl https://api.qmulus.io/v1/sections/query?department=CISC&course_code=124&token=<...>
 *
 * @apiParam {string} [year] Calendar year
 * @apiParam {string=Fall,Summer,Winter} [term] School term
 * @apiParam {String} [department] Can be used to reference `Course`.`department` field
 * @apiParam {String} [course_code] Can be used to reference `Course`.`course_code` field
 * @apiParam {String} [course_name] `Course` name
 * @apiParam {String} [units] `Section` units
 * @apiParam {String} [campus] `Section` campus location
 * @apiParam {String=Undergraduate,Graduate,Undergraduate Online,Non-Credit} [academic_level] `Course` level
 *
 * @apiSuccess {Object[]} course Array of `Section` objects.
 *   See [object definition here](#api-Sections-GetSection)
 *
 */
/* eslint-enable */
router.get('/query',
  tokenValidator,
  validator.limit,
  validator.offset,
  validator.sort,
  createGenericQueryParser(Section),
)

/* eslint-disable */
/**
 * @api {get} /sections/ List Sections
 * @apiName ListSections
 * @apiGroup Sections
 *
 * @apiUse QmulusGETEndpoint
 * @apiUse QmulusLimitOffsetSort
 *
 * @apiExample {curl} Example usage:
 *   curl https://api.qmulus.io/v1/sections/?limit=100&sort=-id&token=<...>
 *
 * @apiSuccess {Object[]} course Array of `Section` objects.
 *   See [object definition here](#api-Sections-GetSection)
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "id": "2020-WI-U-M-CISC-500B",
 *        "year": "2020",
 *        "term": "Winter",
 *        ...
 *      },
 *      {
 *        "id": "2020-WI-U-M-CISC-499",
 *        "year": "2020",
 *        "term": "Winter",
 *        ...
 *      },
 *      ...
 *    ]
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
 * @api {get} /sections/search Search Sections
 * @apiName SearchSections
 * @apiGroup Sections
 *
 * @apiUse QmulusGETEndpoint
 * @apiUse QmulusLimitOffsetSort
 *
 * @apiParam {string} q Full text search string query
 *
 * @apiExample {curl} Example usage:
 *   curl https://api.qmulus.io/v1/sections/search?q=CISC&token=<...>
 *
 * @apiSuccess {Object[]} course Array of found `Section` objects.
 *   See [object definition here](#api-Sections-GetSection)
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
 * @api {get} /sections/:id Get specifc Section
 * @apiName GetSection
 * @apiGroup Sections
 *
 * @apiUse QmulusGETEndpoint
 *
 * @apiParam {string} :id `Section` id
 *
 * @apiSuccess {string} id `Section` id
 * @apiSuccess {string} year Calendar year
 * @apiSuccess {string=Fall,Summer,Winter} term School term
 * @apiSuccess {String} department Can be used to reference `Course`.`department` field
 * @apiSuccess {String} course_code Can be used to reference `Course`.`course_code` field
 * @apiSuccess {String} course_name `Course` name
 * @apiSuccess {String} units `Section` units
 * @apiSuccess {String} campus `Section` campus location
 * @apiSuccess {String=Undergraduate,Graduate,Undergraduate Online,Non-Credit} academic_level `Course` level
 * @apiSuccess {Object[]} course_sections List of individual sections in course
 * @apiSuccess {String[]} course_sections.combined_with `Course`/`Section` combinations
 * @apiSuccess {Object[]} course_sections.dates Date/Timeslot details
 * @apiSuccess {String[]} course_sections.dates.instructors List of course/section instructors
 * @apiSuccess {String} course_sections.dates.day Day of the week (ex "Thursday")
 * @apiSuccess {String} course_sections.dates.start_time Start time of section in 24 hour time. (ex: "13:30")
 * @apiSuccess {String} course_sections.dates.end_time End time of section in 24 hour time. (ex: "14:30")
 * @apiSuccess {String} course_sections.dates.start_date Start date in YYYY-MM-DD
 * @apiSuccess {String} course_sections.dates.end_date End date in YYYY-MM-DD
 * @apiSuccess {String} course_sections.dates.location Building and Room
 * @apiSuccess {String} course_sections.section_name ID for each `Section`
 * @apiSuccess {String} course_sections.section_type `Section` type (ex: "Lecture")
 * @apiSuccess {String} course_sections.section_number `Section` number
 * @apiSuccess {Number} course_sections.class_number
 * @apiSuccess {Number} course_sections.enrollment_capacity Although these details are provided by Qmulus, they may be out of date
 * @apiSuccess {Number} course_sections.enrollment_total
 * @apiSuccess {Number} course_sections.waitlist_capacity
 * @apiSuccess {Number} course_sections.waitlist_total
 * @apiSuccess {Number} course_sections.last_updated Timestamp of when this data was last updated from Queen's
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "id": "2019-FA-U-M-CISC-124",
 *      "year": "2019",
 *      "term": "Fall",
 *      "department": "CISC",
 *      "course_code": "124",
 *      "course_name": "Introduction to Computing Science II",
 *      "units": 3,
 *      "campus": "Main",
 *      "academic_level": "Undergraduate",
 *      "course_sections": [
 *        {
 *          "combined_with": [],
 *          "dates": [
 *            {
 *              "instructors": [
 *                "McLeod, Alan"
 *              ],
 *              "day": "Monday",
 *              "start_time": "12:30",
 *              "end_time": "13:30",
 *              "start_date": "2019-09-05",
 *              "end_date": "2019-12-02",
 *              "location": "CHERNOFF AUD"
 *            },
 *            {
 *              "instructors": [
 *                "McLeod, Alan"
 *              ],
 *              "day": "Wednesday",
 *              "start_time": "11:30",
 *              "end_time": "12:30",
 *              "start_date": "2019-09-05",
 *              "end_date": "2019-12-02",
 *              "location": "CHERNOFF AUD"
 *            },
 *            {
 *              "instructors": [
 *                "McLeod, Alan"
 *              ],
 *              "day": "Thursday",
 *              "start_time": "13:30",
 *              "end_time": "14:30",
 *              "start_date": "2019-09-05",
 *              "end_date": "2019-12-02",
 *              "location": "CHERNOFF AUD"
 *            }
 *          ],
 *          "section_name": "001-LEC",
 *          "section_type": "Lecture",
 *          "section_number": "001",
 *          "class_number": 2408,
 *          "enrollment_capacity": 250,
 *          "enrollment_total": 160,
 *          "waitlist_capacity": 25,
 *          "waitlist_total": 0,
 *          "last_updated": "2019-10-14T01:38:34.565573+00:00"
 *        },
 *        {
 *          "combined_with": [],
 *          "dates": [
 *            {
 *              "instructors": [
 *                "McLeod, Alan"
 *              ],
 *              "day": "Wednesday",
 *              "start_time": "15:30",
 *              "end_time": "17:30",
 *              "start_date": "2019-09-05",
 *              "end_date": "2019-11-29",
 *              "location": "JEFFERY RM155"
 *            }
 *          ],
 *          "section_name": "002-LAB",
 *          "section_type": "Laboratory",
 *          "section_number": "002",
 *          "class_number": 2417,
 *          "enrollment_capacity": 50,
 *          "enrollment_total": 48,
 *          "waitlist_capacity": 5,
 *          "waitlist_total": 0,
 *          "last_updated": "2019-10-14T01:38:37.464146+00:00"
 *        },
 *        {
 *          "combined_with": [],
 *          "dates": [
 *            {
 *              "instructors": [
 *                "McLeod, Alan"
 *              ],
 *              "day": "Monday",
 *              "start_time": "18:30",
 *              "end_time": "20:30",
 *              "start_date": "2019-09-05",
 *              "end_date": "2019-12-02",
 *              "location": "JEFFERY RM155"
 *            }
 *          ],
 *          "section_name": "003-LAB",
 *          "section_type": "Laboratory",
 *          "section_number": "003",
 *          "class_number": 2416,
 *          "enrollment_capacity": 50,
 *          "enrollment_total": 25,
 *          "waitlist_capacity": 5,
 *          "waitlist_total": 0,
 *          "last_updated": "2019-10-14T01:38:41.023160+00:00"
 *        },
 *        ...
 *      ]
 *    }
 *
 */
/* eslint-enable */
router.get('/:id', tokenValidator, show)

export default router
