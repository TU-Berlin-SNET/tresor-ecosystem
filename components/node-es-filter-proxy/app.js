/**
 * Checks incoming requests to elasticsearch before
 * proxying valid ones to elasticsearch effectively filtering
 * forbidden requests and restricting access to the data
 */
var log = require('./logging');
var logstream = { write: function(message, encoding) {
    log.info('MORGAN: ' + message);
}};

var filterClass = require('./tresor-filter.js');
var httpProxy = require('http-proxy');
var express = require('express');
var morgan = require('morgan');

var filterAllows = filterClass.filterAllows;
var app = express();
var server;

var config = {
    host: process.env.ES_FILTER_HOST || 'localhost',
    port: process.env.ES_FILTER_PORT || 4004,
    es_host: process.env.ES_HOST || 'http://localhost',
    es_port: process.env.ES_PORT || 9200
};

startApp(config);

function startApp(config) {
    app.disable('x-powered-by');
    app.use(morgan('dev', { stream: logstream }));

    var proxy = httpProxy.createProxy({
        xfwd: false,
        target: config.es_host+':'+config.es_port
    });

    app.use('/', function(req, res, next) {
        if (filterAllows(req))
            proxy.web(req, res);
        else
            res.status(403).end();
    });

    server= app.listen(config.port, config.host, function() {
        log.info('SUCESS node-es-filter-proxy with target '+config.es_host+':'+config.es_port+' now listening on '+config.host+':'+config.port);
    });
}
