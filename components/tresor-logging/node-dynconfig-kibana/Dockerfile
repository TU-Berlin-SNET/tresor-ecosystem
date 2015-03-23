FROM dockerfile/nodejs

RUN wget https://download.elasticsearch.org/kibana/kibana/kibana-3.1.2.tar.gz &&\
    tar xvzf kibana-3.1.2.tar.gz &&\
    rm -f kibana-3.1.2.tar.gz &&\
    mv kibana-3.1.2 /opt/kibana

ADD . /opt/node-dynconfig-kibana

WORKDIR /opt/node-dynconfig-kibana

RUN mv /opt/kibana /opt/node-dynconfig-kibana/kibana &&\
    npm install

ENTRYPOINT ["node", "app.js"]

EXPOSE 3003

