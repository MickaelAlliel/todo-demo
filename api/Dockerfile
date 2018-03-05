FROM node:8.9.4
RUN export NODE_ENV=production
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app
RUN npm install
COPY . /usr/src/app
EXPOSE 4000
CMD ["npm", "start"]