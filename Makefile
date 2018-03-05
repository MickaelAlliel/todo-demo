run-prod: install-dependencies start-db start-api start-web

start-db:
	mongod

start-api:
	export NODE_ENV=production && node ./api/server.js

start-web:
	export NODE_ENV=production && ./web/node_modules/serve/bin/serve.js -s ./web/build

install-dependencies:
	cd api && npm install --production
	cd web && yarn install --production