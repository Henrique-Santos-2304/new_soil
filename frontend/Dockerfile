FROM node:16.16.0

WORKDIR /usr/new_soil/frontend

COPY package.json .

COPY tsconfig.json .

RUN yarn

COPY . .

