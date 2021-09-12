FROM node:16-alpine

WORKDIR /backend/

ENV AWS_ACCESS_KEY_ID=ABCDEFGHIJ123456789
ENV AWS_SECRET_ACCESS_KEY=O12ABC3456DEFGHIJKLMNOPQRXTUVWX987654321
ENV AWS_REGION=us-east-1

COPY . ./
# COPY package*.json ./

# COPY routes.js ./
# COPY S3_topLevelMethods.js ./
# COPY S3_Upload.js ./
# COPY server.js ./
# COPY utilities ./

RUN npm ci --loglevel warn

EXPOSE 3200

CMD ["node", "server.js"]