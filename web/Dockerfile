FROM node:8.9.4
ENV NODE_ENV=production
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN yarn install
COPY . /usr/src/app
RUN yarn build
EXPOSE 5000
CMD ["./node_modules/serve/bin/serve.js", "-s", "build"]