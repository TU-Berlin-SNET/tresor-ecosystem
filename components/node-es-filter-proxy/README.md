node-es-filter-proxy
====================

Filters requests to an [elasticsearch](https://github.com/elasticsearch/elasticsearch) instance which is listening on localhost.


Usage
=====
```
git clone
npm install
node app.js
```


Configuration
=============

Either configure directly in app.js var config or through setting environment variables.

* `ES_FILTER_HOST`: Where this app should listen (default: localhost)
* `ES_FILTER_PORT`: At which port to listen (default: 4004)
* `ES_HOST`: Host where elasticsearch is reachable (default: http://localhost)
* `ES_PORT`: Port where elasticsearch is reachable (default: 9200)