FROM node:16.14.0-alpine

RUN apk --update add --no-cache bash

ARG TZ='America/Sao_Paulo'

ENV TZ ${TZ}

RUN apk upgrade --update \
  && apk add --no-cache openssl \
  && apk add -U tzdata \
  && cp /usr/share/zoneinfo/${TZ} /etc/localtime \
  && apk del tzdata \
  && apk add chromium

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

ENV CHROME_BIN='/usr/bin/chromium-browser'

RUN npm i -g @angular/cli@13.2.6

USER node

WORKDIR /home/node/app

COPY . .
