FROM ubuntu:latest
COPY judge* /Judge/
RUN apt-get update \ 
    && apt-get install g++ -y \
    && g++ /Judge/judge.cpp -o /Judge/judge \
    && apt-get install python2.7 -y\
    && ln -s /usr/bin/python2.7 /usr/bin/python