# react build production
FROM node:16-alpine

# WORKDIR /frontend/

# COPY . ./
COPY package*.json ./
COPY webpack.config.js ./
COPY src/index.html ./src/
COPY src/index.js ./src/
COPY src/components/ ./src/components/
COPY src/style/ ./src/style/
COPY src/redux/ ./src/redux/

RUN npm install
# RUN npm ci --loglevel warn

EXPOSE 8080

# RUN npm start
CMD ["npm", "start"]
