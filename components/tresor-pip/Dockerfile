FROM dockerfile/ubuntu:14.04

MAINTAINER Sebastian Zickau <sebastian.zickau@tu-berlin.de>

# install mysql and postgresql and postgis (postgresql extension). Create mysql databases.
# as the recommendation say, only run one process in a container, the dbs maybe better put into its own docker container  

# install apache2, java, tomcat, maven   
RUN sudo apt-get -y install apache2
    sudo add-apt-repository -y ppa:webupd8team/java
    #hier ist eine Lizenzabfrage von Oracle
    sudo apt-get -y update &&\
    sudo apt-get -y install oracle-java7-installer &&\ 
    sudo apt-get -y install tomcat7 &&\
	sudo apt-get -y install tomcat7-admin &&\
	sudo apt-get -y install maven

# export java home variable	
RUN echo "export JAVA_HOME=/usr/lib/jvm/java-7-oracle" >> /etc/profile
RUN echo "export PATH=$PATH:/usr/lib/jvm/java-7-oracle/bin" >> /etc/profile

ADD . /opt/positioning-enabler

WORKDIR /opt/positioning-enabler

# run maven
RUN mvn -DskipTests=true clean package &&\
    cp /opt/positioning-enabler/target/Positioning-Enabler-0.0.1-SNAPSHOT.war /opt/var/lib/tomcat7/webapps/pe.war

CMD service tomcat7 start