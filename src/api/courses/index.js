import express from 'express'

import list from './routes/list'
import search from './routes/search'
import show from './routes/show'

import validator from '../../utils/validator'
import { tokenValidator } from '../../utils/apiTokenManager'

const router = express.Router()

/* eslint-disable */
/**
 * @api {get} /courses/ List Courses
 * @apiName ListCourses
 * @apiGroup Courses
 *
 * @apiUse QmulusGETEndpoint
 * @apiUse QmulusLimitOffsetSort
 *
 * @apiExample {curl} Example usage:
 *   curl https://api.qmulus.io/v1/courses/?limit=100&sort=-department&token=<...>
 *
 * @apiSuccess {Object[]} course Array of `Courses` objects.
 *   See [object definition here](#api-Courses-GetCourse)
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    [
 *      {
 *        "id": "AGHE-800",
 *        "course_name": "Evaluating Aging-Related Programs and Services",
 *        ...
 *      },
 *      {
 *        "id": "AGHE-802",
 *        "name": "Ethics and Bioethics of Aging"
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
 * @api {get} /courses/search Search Courses
 * @apiName SearchCourses
 * @apiGroup Courses
 *
 * @apiUse QmulusGETEndpoint
 * @apiUse QmulusLimitOffsetSort
 *
 * @apiParam {string} q Full text search string query
 *
 * @apiExample {curl} Example usage:
 *   curl https://api.qmulus.io/v1/courses/search?q=Computing&limit=100&sort=-department&token=<...>
 *
 * @apiSuccess {Object[]} course Array of found `Courses` objects.
 *   See [object definition here](#api-Courses-GetCourse)
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
 * @api {get} /courses/:id Get specifc Course
 * @apiName GetCourse
 * @apiGroup Courses
 *
 * @apiUse QmulusGETEndpoint
 *
 * @apiParam {string} :id `Course` id
 *
 * @apiSuccess {string} id `Course` id
 * @apiSuccess {Object} CEAB Engineers Canada Accreditation Credits.
 *   https://engineerscanada.ca/accreditation/accreditation-board
 * @apiSuccess {string} department `Department` code
 * @apiSuccess {string} course_code Numeric course code
 * @apiSuccess {string} course_name `Course` name
 * @apiSuccess {string} campus `Course` location such as Main or Bader
 *   International Study Ctr)
 * @apiSuccess {string} description Description from solus.
 * @apiSuccess {string} grading_basis Grading details. (Graded, Transfer
 *   Grading Basis, No Transcript Print, Pass/Fail, Honours/Pass/Fail,
 *   Non-Graded Component)
 * @apiSuccess {Object} course_components Object with required course components
 *   as 'keys'. Options below, value will be "Required" if component applies.
 * @apiSuccess {String} course_components.tutorial
 * @apiSuccess {String} course_components.lecture_discussion
 * @apiSuccess {String} course_components.lecture_laboratory
 * @apiSuccess {String} course_components.lecture_tutorial
 * @apiSuccess {String} course_components.lecture_demonstration
 * @apiSuccess {String} course_components.lecture_discussion
 * @apiSuccess {String} course_components.lecture
 * @apiSuccess {String} course_components.laboratory
 * @apiSuccess {String} course_components.laboratory_seminar
 * @apiSuccess {String} course_components.blended
 * @apiSuccess {String} course_components.studio
 * @apiSuccess {String} course_components.fieldstudies "field studies"
 * @apiSuccess {String} course_components.individualstudy "individual study"
 * @apiSuccess {String} course_components.correspondence
 * @apiSuccess {String} course_components.online
 * @apiSuccess {String} course_components.research
 * @apiSuccess {String} course_components.reading
 * @apiSuccess {String} course_components.project
 * @apiSuccess {String} course_components.clinical
 * @apiSuccess {String} course_components.seminar
 * @apiSuccess {String} course_components.practicum
 * @apiSuccess {String} requirements Prerequisite requirements.
 * @apiSuccess {String} add_consent Specific requirements for adding the course.
 * @apiSuccess {String} drop_consent Specific requirements for dropping
 *   the course.
 * @apiSuccess {String=Undergraduate,Graduate,Undergraduate Online,Non-Credit} academic_level
 * @apiSuccess {String} academic_group Faculty group. Ex: Faculty of Arts
 *   and Science, Faculty of Law, School of Graduate Studies
 * @apiSuccess {String} academic_org School or Department. Ex: School of
 *   Computing, Dept of Chemical Engineering
 * @apiSuccess {Number} units `Course` units.
 *
 * @apiSuccessExample {json} Success-Response:
 *    HTTP/1.1 200 OK
 *    {
 *      "CEAB": {
 *        "math": 0,
 *        "basic_sci": 0,
 *        "comp_st": 0,
 *        "eng_sci": 0,
 *        "end_des": 0
 *      },
 *      "id": "CISC-124",
 *      "department": "CISC",
 *      "course_code": "124",
 *      "course_name": "Introduction to Computing Science II",
 *      "campus": "Main",
 *      "description": "Introduction to object-oriented design, ...",
 *      "grading_basis": "Graded",
 *      "course_components": {
 *        "laboratory": "Required",
 *        "lecture": "Required"
 *      },
 *      "requirements": "Prerequisite C- in CISC121 \nCorequisite CISC102 or ",
 *      "add_consent": "",
 *      "drop_consent": "",
 *      "academic_level": "Undergraduate Online",
 *      "academic_group": "Faculty of Arts and Science",
 *      "academic_org": "School of Computing",
 *      "units": 3
 *    }
 *
 */
/* eslint-enable */
router.get('/:id', tokenValidator, show)

export default router
