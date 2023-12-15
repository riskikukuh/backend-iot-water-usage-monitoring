FROM node:18-alpine

RUN apk add --no-cache tzdata
RUN cp /usr/share/zoneinfo/Asia/Jakarta /etc/localtime
WORKDIR /usr/src/app
COPY . .
RUN apk add --update nano
RUN npm install pm2 -g
RUN npm install