import winston from 'winston'
import DatadogTransport from '@shelf/winston-datadog-logs-transport'
import dotenv from 'dotenv'

dotenv.config()
const DD_MANUAL_TRANSPORT = process.env.DD_MANUAL_TRANSPORT === 'true'
const DD_API_KEY = process.env.DD_API_KEY
const LOGGING_SOURCE = process.env.LOGGING_SOURCE
const LOGGING_ENVIRONMENT = process.env.LOGGING_ENVIRONMENT
const LOGGING_HOST = process.env.LOGGING_HOST
const LOGGING_SERVICE = process.env.LOGGING_SERVICE

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    verbose: 'blue',
  },
}

const customFomat = winston.format.printf(info => {
  return `${info.timestamp} [${info.level}]: ${info.message}`
})

const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    customFomat,
  ),
})

const transports = [consoleTransport]

if (DD_MANUAL_TRANSPORT) {
  const ddTransport = new DatadogTransport({
    apiKey: DD_API_KEY,
    format: winston.format.json(),
    metadata: {
      ddsource: LOGGING_SOURCE,
      environment: LOGGING_ENVIRONMENT,
      host: LOGGING_HOST,
      service: LOGGING_SERVICE,
    },
  })
  transports.push(ddTransport)
}

const logger = winston.createLogger({
  levels: customLevels.levels,
  transports,
})

winston.addColors(customLevels)

// Standard Apache output, except for datetime, which is already included
const format = ':remote-addr - :remote-user ":method :url HTTP/:http-version"' +
' :status :res[content-length] ":referrer" ":user-agent"'

const jsonFormat = (tokens, req, res) => {
  const url = tokens.url(req, res)
  const path = url.split('?')[0]
  const queryString = url.split('?')[1]
  const params = new URLSearchParams(queryString)
  const paramsObj = {}
  for (const [key, value] of params) {
    paramsObj[key] = value
  }

  return JSON.stringify({
    network: {
      // TODO: content-length not actually being written
      bytes_written: tokens.res(req, res, 'content-length'),
      client: {
        ip: tokens['remote-addr'](req, res),
      },
    },
    duration: parseInt(tokens['response-time'](req, res)) * 1000000,
    http: {
      method: tokens.method(req, res),
      url,
      status_code: tokens.status(req, res),
      url_details: {
        path,
        queryString: paramsObj,
      },
    },
  })
}

const prodFormat = DD_MANUAL_TRANSPORT ? jsonFormat : format
logger.morganFormat = process.env.NODE_ENV === 'production' ? prodFormat : 'dev'
logger.winstonStream = {
  write: (message, encoding) => {
    // remove Morgan's newline
    logger.info(message.split('\n')[0])
  },
}

export default logger
