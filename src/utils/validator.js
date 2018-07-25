const LIMIT = 20
const OFFSET = 0
const SORT_MAP = {
  'buildings': 'id',
  'textbooks': 'isbn_13',
  'news': 'published',
  'courses': 'department course_code',
  'departments': 'code',
  'sections': 'year term academic_level campus department course_code',
}

const validator = {}

validator.query = (req, res, next) => {
  const query = req.query.q

  if (!query) _throwError('Query must be specified.', next)
  if (query.length < 3) _throwError('Query length must be more than 2.', next)

  _handleQuery(req, 'limit', parseInt(query), next)
}

validator.limit = (req, res, next) => {
  const query = req.query.limit || LIMIT
  const message = 'Limit must be between 1 and 100.'

  if (isNaN(query) || query < 1 || query > 100) _throwError(message, next)
  _handleQuery(req, 'limit', parseInt(query), next)
}

validator.offset = (req, res, next) => {
  const query = req.query.offset || OFFSET
  const message = 'Offset must be positive integer.'

  if (isNaN(query) || query < 0) _throwError(message, next)
  _handleQuery(req, 'offset', parseInt(query), next)
}

validator.sort = (req, res, next) => {
  const route = getBaseRoute(req)
  const query = req.query.sort || SORT_MAP[route]
  const message = 'Sort length must be greater than 1.'

  if (query.length < 2) _throwError(message, next)
  _handleQuery(req, 'sort', query, next)
}

function getBaseRoute (req) {
  // Usage: '/v1/buildings/unnecessary/parts?and=params' => 'buildings'
  return req.originalUrl.split('?')[0].split('/')[2]
}

function _throwError (message, next) {
  const error = new Error(message)
  error.status = 422
  return next(error)
}

function _handleQuery (req, type, query, next) {
  req.query[type] = query
  next()
}

export default validator
