import winston from 'winston'

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

const logger = winston.createLogger({
  levels: customLevels.levels,
  transports: [consoleTransport],
})

winston.addColors(customLevels)

// Standard Apache output, except for datetime, which is already included
const format = ':remote-addr - :remote-user ":method :url HTTP/:http-version"' +
' :status :res[content-length] ":referrer" ":user-agent"'

logger.morganFormat = process.env.NODE_ENV === 'production' ? format : 'dev'
logger.winstonStream = {
  write: (message, encoding) => {
    // remove Morgan's newline
    logger.info(message.split('\n')[0])
  },
}

export default logger
