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

logger.stream = {
  write: (message, encoding) => {
    // use the 'info' log level so the output will be picked up by both
    // transports
    logger.info(message)
  },
}

export default logger
