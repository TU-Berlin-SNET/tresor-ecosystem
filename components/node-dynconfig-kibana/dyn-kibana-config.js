/**
 * Provides dynamic kibana configuration
 *
 * Dynamic config component
 */

var replaceString = '#es_url#';
var kibana_config = [
    "define(['settings'],",
    "function (Settings) {",
    '  "use strict";',
    "  return new Settings({",
    '    elasticsearch: "'+replaceString+'",',
    "    default_route     : '/dashboard/file/default.json',",
    '    kibana_index: "kibana-int",',
    "    panel_names: [ 'histogram', 'map', 'goal', 'table', 'filtering', 'timepicker', 'text', 'hits', 'column', 'trends', 'bettermap', 'query', 'terms', 'stats', 'sparklines' ]",
    "  });",
    "});"
  ].join("\n");

 exports.getDynamicKibanaConfig = function getDynamicKibanaConfig(req, config) {
    return kibana_config.replace(replaceString, config.es_url);
 }