/**
 * Provides and configures logger
 */

var winston = require('winston');

var log = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            colorize: true, 
            timestamp: true,
            handleExceptions: true
        })
    ],
    exitOnError: false
});

module.exports = log;
