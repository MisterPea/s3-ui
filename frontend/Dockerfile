# react build production
FROM node:14-alpine as frontend_build

WORKDIR /frontend

COPY package*.json ./
COPY webpack.config.js ./

RUN npm install npm@latest
RUN npm install

COPY . ./

RUN npm run build

# server environment
FROM nginx:alpine
COPY /nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=frontend_build /frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]