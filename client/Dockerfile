# syntax=docker/dockerfile:1
FROM node:14-alpine
# FROM arm32v7/node:14-alpine
# RUN apk add --no-cache python3 g++ make

COPY . .

RUN npm run build

EXPOSE 3000

# FROM node:12-alpine
# RUN apk add --no-cache python3 g++ make

# COPY . .
# RUN yarn install --production
# CMD ["node", "app.js"]
# EXPOSE 5010

