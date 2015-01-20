/**
 * Filter for node-es-filter-proxy.
 * Only allows requests to elasticsearch
 * when requested index and tresor-organization header match
 * or see TODO below
 */

var url = require('url');
var log = require('./logging');

var replaceString = '#clientId#';

var nodesRegEx = /^\/_nodes$/;
var dataPattern = '^/(#clientId#-[\\d\\.,]+)+/(_aliases|_search|_mapping)$';

exports.filterAllows = function filterAllows(req) {
    // get tresor-organization-uuid header
    var clientId = req.get('tresor-organization-uuid')

    // TODO SET RETURN FALSE ON PRODUCTION, it is only true for testing purposes
    if (!clientId)
        return true;

    // get only the url path, no querystring
    var reqUrl = url.parse(req.url).pathname;
    if (nodesRegEx.test(reqUrl))
        return true;

    // insert actual clientId
    var dataRegEx = new RegExp(dataPattern.replace(replaceString, clientId));
    if (dataRegEx.test(reqUrl))
        return true;

    log.warn('FILTER no rule matches for '+reqUrl);
    return false;
}