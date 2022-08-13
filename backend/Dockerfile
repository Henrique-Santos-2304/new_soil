FROM node:16.16.0

WORKDIR /usr/academy/backend

COPY package.json .

COPY tsconfig.json .

RUN yarn 

COPY . .

EXPOSE 3308

CMD ["yarn", "dev"]