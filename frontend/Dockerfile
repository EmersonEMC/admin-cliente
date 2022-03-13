FROM node:16.14.0-alpine

RUN apk --update add --no-cache bash

ARG TZ='America/Sao_Paulo'

ENV TZ ${TZ}

RUN apk upgrade --update \
  && apk add -U tzdata \
  && cp /usr/share/zoneinfo/${TZ} /etc/localtime \
  && apk del tzdata \
  && apk add chromium \
  && rm -rf \
  /var/cache/apk/*

ENV CHROME_BIN='/usr/bin/chromium-browser'

RUN npm i -g @angular/cli@13.2.6

USER node

WORKDIR /home/node/app

COPY . .
