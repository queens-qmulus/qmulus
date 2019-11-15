import RateLimit from 'express-rate-limit'

const version = 'v1'

// API rate limiting
const rateLimiter = new RateLimit({
  max: 1000, // 1000 requests
  windowMs: 1000 * 60 * 60, // per hour
  delayMs: 0, // disable delaying - full speed until the max limit is reached
  skipFailedRequests: true,
  handler: (req, res, next) => {
    next({ status: 429, message: 'API rate limit exceeded' })
  },
})

const checkRateLimit = (req, res, next) => {
  const headers = res.getHeaders()
  const limit = headers['x-ratelimit-limit']
  const remaining = headers['x-ratelimit-remaining']

  res.json({ limit: limit, remaining: remaining })
}

const showAvailableUrls = (req, res, next) => {
  const url = `${req.protocol}://${req.get('host')}/${version}`

  res.json({
    buildingsUrl: `${url}/buildings`,
    coursesUrl: `${url}/courses`,
    departmentsUrl: `${url}/departments`,
    // TODO: re-enable news once we have the datasets
    // newsUrl: `${url}/news`,
    sectionsUrl: `${url}/sections`,
    textbooksUrl: `${url}/textbooks`,
  })
}

export default { version, showAvailableUrls, checkRateLimit, rateLimiter }
