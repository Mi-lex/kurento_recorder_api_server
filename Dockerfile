FROM node:12.18.2-alpine

RUN apk update
RUN apk upgrade
RUN apk add --no-cache git
EXPOSE 3000

WORKDIR /app
ADD package.json package-lock.json ./
RUN npm i
ADD . /app

ENTRYPOINT ["npm", "start"]
