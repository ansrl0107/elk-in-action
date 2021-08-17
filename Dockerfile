FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./
COPY ./tsconfig.json ./
COPY ./src ./src

RUN yarn
RUN yarn build

CMD ["node", "./dist/index.js"]