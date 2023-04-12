const { expect } = require('chai');
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  ],
});
const wiaLogger = require('../index');

describe('WiaLoggerTests', () => {
  before((done) => {
    logger.info('Starting tests.');
    done();
  });

  describe('#sendMessageToLogs', () => {
    it('should send message to logs', (done) => {
      logger.info('Testing sending to logs. Working OK!');
      setTimeout(() => {
        done();
      }, 500);
    });
  });

  describe('#checkIfLoggerInfoExists', () => {
    it('should check if info function exists', (done) => {
      expect(wiaLogger.info).to.exist;
      done();
    });
  });

  describe('#checkIfLoggerErrorExists', () => {
    it('should check if error function exists', (done) => {
      expect(wiaLogger.error).to.exist;
      done();
    });
  });

  after((done) => {
    logger.info('Finished tests.');
    done();
  });
});
