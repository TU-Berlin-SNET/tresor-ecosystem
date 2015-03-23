/**
 * Provides a dynamic configuration for kibana
 * based on the information given in the
 * tresor-organization header
 *
 * Main/Server component
 */

var express = require('express');
var morgan = require('morgan');
var app = express();
var server;

var getDynDashConfig = require('./dyn-kibana-dashboard').getDynamicDashboardConfig;
var getDynConfig = require('./dyn-kibana-config').getDynamicKibanaConfig;

var config = {
    host: process.env.KIBANA_HOST || 'localhost',
    port: process.env.KIBANA_PORT || 3003,
    es_url: process.env.ES_URL || 'http://"+window.location.hostname+"'
};

startApp(app, config);

function startApp(app, config) {
    app.disable('x-powered-by');
    app.use(morgan('dev'));

    /* intercept all requests for a dashboard configuration */
    app.get('/kibana/app/dashboards/*', function(req, res, next) {
        var dashConf = getDynDashConfig(req);
        res.status(200).type('application/json').send(dashConf);
    });

    /* intercept all requests for kibana configuration */
    app.get('/kibana/config.js', function(req, res, next) {
        var kibConf = getDynConfig(req, config);
        res.status(200).type('application/javascript').send(kibConf);
    });

    /* all other kibana files */
    app.use('/kibana/', express.static(__dirname + '/kibana'));

    /* a simple healtcheck */
    app.get('/healthcheck', function(req, res) {
        res.json({ "status": "ok" });
    });

    /* actually listen */
    server = app.listen(config.port, config.host, function() {
        console.log('kibana-dyn-config provider listening on '+config.host+":"+config.port);
        console.log('Expecting elasticsearch at '+config.es_url);
    });
}
