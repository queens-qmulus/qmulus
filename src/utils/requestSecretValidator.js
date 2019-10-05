import dotenv from 'dotenv'
import logger from './logger'

dotenv.config()
const INTER_SERVICE_SECRET = process.env.INTER_SERVICE_SECRET

export function validateSecret (req, res, next) {
  if (!INTER_SERVICE_SECRET || !req.body.secret ||
    INTER_SERVICE_SECRET !== req.body.secret) {
    logger.error('Forbidden request to inter-service endpoint')
    return res.status(403).json({ error: 403, message: 'Forbidden' })
  }
  next()
}
