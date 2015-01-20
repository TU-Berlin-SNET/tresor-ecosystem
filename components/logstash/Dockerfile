FROM dockerfile/java

ENV LS_PKG_NAME logstash-1.4.2

RUN wget https://download.elasticsearch.org/logstash/logstash/$LS_PKG_NAME.tar.gz &&\
    tar xvzf $LS_PKG_NAME.tar.gz &&\
    rm -f $LS_PKG_NAME.tar.gz &&\
    mv $LS_PKG_NAME /logstash &&\
    wget -O /logstash/lib/logstash/codecs/json.rb https://raw.githubusercontent.com/mluebcke/logstash/b43d6b0e5a93d847696fbda6da311743c1548606/lib/logstash/codecs/json.rb &&\
    wget -O /logstash/lib/logstash/codecs/json_lines.rb https://raw.githubusercontent.com/mluebcke/logstash/master/lib/logstash/codecs/json_lines.rb &&\
    wget -O /logstash/spec/codecs/json.rb https://raw.githubusercontent.com/mluebcke/logstash/master/spec/codecs/json.rb

ENTRYPOINT ["/logstash/bin/logstash", "-f", "/logstash/logstash.conf"]

EXPOSE 9400
EXPOSE 9500

