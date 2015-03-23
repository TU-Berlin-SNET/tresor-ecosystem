node-dynconfig-kibana
=====================

Hosts [Kibana 3](https://github.com/elasticsearch/kibana/tree/kibana3) as a nodejs express application and provides both dynamic kibana configuration (config.js) and dynamic dashboard configuration (default.json).


Usage
=====
```
git clone
npm install
download & unpack kibana
node app.js
```


Configuration
=============

Either configure directly in app.js var config or through setting environment variables:

* `KIBANA_HOST`: Where this app should listen (default: localhost)
* `KIBANA_PORT`: At which port to listen (default: 3003)
* `ES_URL`: URL to elasticsearch (default: http://"+window.location.hostname+":9200)

