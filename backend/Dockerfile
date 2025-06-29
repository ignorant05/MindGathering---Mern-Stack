FROM node:20-alpine as builder

WORKDIR /app

COPY  package*.json ./
RUN npm install --fronzen-lockfile

COPY . .

EXPOSE 3000
EXPOSE 3002

CMD ["node", "AuthServer.js"] 
