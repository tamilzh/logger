// const path = require('path');
// const fs = require('fs');
const config = require('config');
const winston = require('winston');

// Transports
// const expressWinston = require('express-winston');
// const files = new winston.transports.File({ filename: 'combined.log' });
const console = new winston.transports.Console();
const logstashTransport = require('winston-logstash-transport');

let logger = null;

// TODO: Fix this! Logger is adding multiple instances of transports.
if (config.logger) {
  winston.remove(winston.transports.Console);

  if (config.logger.logstash) {
    console.log('Adding logstash...');

    const transports = [];
    if (config.logger.console) {
      transports.push(new winston.transports.Console({
        level: config.logger.console.level || 'info',
      }));
    }

    logger = logstashTransport.createLogger(null, {
      application: config.logger.logstash.nodeName,
      logstash: {
        host: config.logger.logstash.host,
        port: config.logger.logstash.port,
      },
      transports,
    });
  } else {
    const transports = [];
    if (config.logger.console) {
      transports.push(new winston.transports.Console({
        level: config.logger.console.level || 'info',
      }));
    }

    logger = winston.createLogger({
      level: 'info',
      transports,
    });

    logger.exitOnError = false;
  }
}

// winston.expressLogger = function () {
//   return expressWinston.logger({
//     winstonInstance: winston,
//     meta: true,
//     msg: 'HTTP {{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}',
//     expressFormat: true,
//     colorize: false,
//     ignoreRoute: function (req, res) { //eslint-disable-line no-unused-vars
//       return false;
//     }
//   });
// };

module.exports = logger;
