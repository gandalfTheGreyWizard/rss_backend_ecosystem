require('dotenv').config()

const winston = require('winston');
const logger = winston.createLogger({
  transports: new winston.transports.Console(),
  level: process.env.LOG_LEVEL
});

module.exports = logger;
