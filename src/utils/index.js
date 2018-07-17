import mcache from 'memory-cache'
import RateLimit from 'express-rate-limit'

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

// Server-side caching
const cache = () => {
  // 30 minute cache duration
  const duration = 1000 * 60 * 30

  return (req, res, next) => {
    const key = req.originalUrl
    const cachedDocs = mcache.get(key)

    // Return cached result if found
    if (cachedDocs) {
      res.status(304).json(cachedDocs)
      return
    }

    // Pass updated res.json function to router, which updates the cache when
    // the callback is executed
    res.sendJSON = res.json
    res.json = (docs) => {
      mcache.put(key, docs, duration)
      res.sendJSON(docs)
    }
    next()
  }
}

const checkRateLimit = (req, res, next) => {
  const headers = res.getHeaders()
  const limit = headers['x-ratelimit-limit']
  const remaining = headers['x-ratelimit-remaining']

  res.json({ limit: limit, remaining: remaining })
}

export default {
  cache: cache,
  checkRateLimit: checkRateLimit,
  rateLimiter: rateLimiter,
  version: 'v1',
}
