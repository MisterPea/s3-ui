FROM node:16-alpine

COPY package*.json ./

COPY routes.js ./
COPY S3_topLevelMethods.js ./
COPY S3_Upload.js ./
COPY server.js ./
COPY utilities ./

EXPOSE 3200

CMD ["nodemon", "server.js"]