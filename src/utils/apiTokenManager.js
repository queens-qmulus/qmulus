import dotenv from 'dotenv'
import axios from 'axios'
import sha256 from 'sha256'

import logger from './logger'

dotenv.config()

const TOKEN_SERVICE_URL = `${process.env.QMULUS_MANAGEMENT_URL}/api/token`
const INTER_SERVICE_SECRET = process.env.INTER_SERVICE_SECRET
const USAGE_REPORT_INTERVAL_S = 1 * 60

let apiTokenManagerInstance
export function getApiTokenManager () {
  if (!apiTokenManagerInstance) apiTokenManagerInstance = new ApiTokenManager()
  return apiTokenManagerInstance
}

// TODO: implement max size and cache eviction.
// Not a priority with the number of users we are expecting
// const MAX_SIZE = 100000

class ApiTokenManager {
  constructor () {
    this.unvalidatedTokenHashes = new Set()
    this.tokenHashes = new Map()

    setInterval(() => this.reportUsage(), USAGE_REPORT_INTERVAL_S * 1000)
  }

  reportUsage () {
    const usageReport = {}
    for (const [k, v] of this.tokenHashes.entries()) {
      if (v) usageReport[k] = v
    }

    const usageReportKeys = Object.keys(usageReport)
    if (usageReportKeys.length) {
      const currentTime = Math.floor((new Date()).getTime() / 1000)
      axios.post(`${TOKEN_SERVICE_URL}/report-usage`, {
        usage: usageReport,
        timeStart: currentTime - USAGE_REPORT_INTERVAL_S,
        timeEnd: currentTime,
        secret: INTER_SERVICE_SECRET,
      }).then(() => {
        for (const k of usageReportKeys) {
          this.tokenHashes.set(k, 0)
        }
      }).catch((e) => {
        logger.error('Couldn\'t report token usage to management service.', e)
      })
    }

    this.unvalidatedTokenHashes.forEach((hash) => {
      this.tokenHashes.delete(hash)
    })
  }

  async preCacheApiTokenHashes () {
    try {
      const res = await axios.post(`${TOKEN_SERVICE_URL}/get-all-valid`, {
        secret: INTER_SERVICE_SECRET,
      })
      for (const tokenHash of res.data.tokenHashes) {
        this.tokenHashes.set(tokenHash, 0)
      }
      logger.info(`Pre-cached ${res.data.tokenHashes.length} API token hashes`)
    } catch (e) {
      logger.error('Unknown error occured while pre-caching tokens', e)
    }
  }

  async use (token) {
    const tokenHash = sha256(token)
    let isValid = this.tokenHashes.get(tokenHash) !== undefined

    if (!isValid) {
      isValid = await this.addIfValid(token)
    }

    const numUses = this.tokenHashes.get(tokenHash)
    if (numUses !== undefined) {
      this.tokenHashes.set(tokenHash, numUses + 1)
    }

    return isValid
  }

  async addIfValid (token) {
    const tokenHash = sha256(token)
    if (this.tokenHashes.has(tokenHash)) return true

    try {
      const res = await axios.post(`${TOKEN_SERVICE_URL}/validate`, {
        token,
        secret: INTER_SERVICE_SECRET,
      })
      if (res.data.status === 'valid-api-token') {
        this.tokenHashes.set(tokenHash, 0)
        return true
      } else {
        logger.error('Got unexpected response from token validation service')
        return false
      }
    } catch (e) {
      if (e.response) {
        if (e.response.status === 401) {
          // Token not found/invalid
          return false
        } else if (e.response.status === 403) {
          // INTER_SERVICE_SECRET invalid
          // Does not indicate that the token is invalid.
          // This should never happen. If deployment is misconfigured,
          // err on the side of caution and allow token now, invalidate later.
          this.tokenHashes.set(tokenHash, 0)
          this.unvalidatedTokenHashes.add(tokenHash)
          // TODO: notify administrator
          return true
        }
      } else if (e.request) {
        // No response. Token validation service down. Err on the side
        // of allowing the token.
        this.tokenHashes.set(tokenHash, 0)
        this.unvalidatedTokenHashes.add(tokenHash)
        logger.error('no response from token validation service', e)
        return true
      } else {
        logger.error('Unknown error occured in token validation request', e)
        return true
      }
    }
  }
}

export async function tokenValidator (req, res, next) {
  return next()
}
