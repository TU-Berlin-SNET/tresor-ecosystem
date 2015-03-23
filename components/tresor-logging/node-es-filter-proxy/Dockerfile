FROM dockerfile/nodejs

ADD . /opt/node-es-filter-proxy

WORKDIR /opt/node-es-filter-proxy

RUN npm install

ENTRYPOINT ["node", "/opt/node-es-filter-proxy/app.js"]

EXPOSE 4004

