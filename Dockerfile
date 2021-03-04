FROM node:14.15.4-alpine3.10

WORKDIR /workspace

ADD tsconfig.base.json .
ADD package.json .
ADD yarn.lock .

RUN yarn

ADD src src

RUN yarn build && yarn global add prettier eslint
