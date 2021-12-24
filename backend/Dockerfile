FROM node:14-alpine

WORKDIR /backend

COPY package*.json ./

RUN npm install npm@latest
RUN npm install

COPY . ./

EXPOSE 5001

CMD ["node", "server.js"]