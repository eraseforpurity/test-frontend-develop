FROM node:18-buster-slim

ARG APP_ENV=''
RUN echo ${APP_ENV}
ENV APP_ENV=${APP_ENV}


WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build:${APP_ENV}
EXPOSE 8080
CMD [ "node", "server.js" ]