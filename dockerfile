FROM node:21-alpine

WORKDIR /usr/src/app

COPY ./api .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3030

CMD ["npm", "start"]
