run-prod: install-dependencies install-rookout-agent start-db start-api start-web

run-prod-nodb: install-dependencies install-rookout-agent start-api start-web

start-db:
	mongod

start-api:
	export NODE_ENV=production && node ./api/server.js

start-web:
	export NODE_ENV=production && ./web/node_modules/serve/bin/serve.js -s ./web/build

install-rookout-agent:
	wget "https://get.rookout.com" -O setup.sh
	sh ./setup.sh agent --token=<YOUR_TOKEN>
	/etc/init.d/rookout-agent start

install-dependencies:
	cd api && npm install --production
	cd web && yarn install --production