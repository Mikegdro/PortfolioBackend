ARG DB_URL

#Build stage
FROM node:21-alpine AS build

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

ARG DB_URL
ENV DB_URL=$DB_URL

RUN npm run build

#Production stage
FROM node:21-alpine AS production

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/src/db ./src/db/migrations

CMD ["node", "dist/index.js"]
