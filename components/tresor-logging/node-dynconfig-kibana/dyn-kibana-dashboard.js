/**
 * Provides dynamic kibana dashboard configuration
 *
 * Dynamic dashboard component
 */

var replaceIndexString = require('./dashboard_config').getReplaceIndexString();
var dashboard_config = require('./dashboard_config').getDashboardConfigTemplate();

var replaceClientIdString = '#clientId#';
var allIndex = '"default": "_all", "interval": "none", "pattern": "_all", "warm_fields": true';
var dashboard_index = '"default": "NO_TIME_FILTER_OR_INDEX_PATTERN_NOT_MATCHED", "interval": "day", "pattern": "['+replaceClientIdString+'-]YYYY.MM.DD"';

exports.getDynamicDashboardConfig = function getDynamicDashboardConfig(req) {
    var clientId = req.get('tresor-organization-uuid');

    var replacement_index;
    if (clientId)
        replacement_index = dashboard_index.replace(replaceClientIdString, clientId);
    else
        replacement_index = allIndex;

    return dashboard_config.replace(replaceIndexString, replacement_index);
}