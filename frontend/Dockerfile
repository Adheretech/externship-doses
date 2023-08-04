FROM node:16-alpine AS BUILD_IMAGE

WORKDIR /app

ENV DOSES_ENDPOINT_URL=http://35.231.16.85
ENV DOSES_ENDPOINT_PORT=5000

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "dev"]
