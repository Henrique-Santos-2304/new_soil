FROM node:16.16.0

WORKDIR /usr/new_soil/backend

COPY package.json .

COPY tsconfig.json .

RUN yarn 

COPY . .

EXPOSE 3310

CMD ["yarn", "start:dev"]
RUN npx prisma generate
