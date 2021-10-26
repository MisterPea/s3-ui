# node production
FROM python:3.7-bullseye

RUN pip install localstack
RUN start localstack

FROM node:14-alpine

WORKDIR /backend

COPY package*.json ./

RUN npm install npm@latest
RUN npm install

COPY . ./

EXPOSE 80

CMD ["node", "server.js"]