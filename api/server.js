'use strict';
const Hapi = require('hapi');
const Good = require('good');
const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');
const Inert = require('inert');
const config = require('./config');

const Routes = require('./src/routes')

// Create a server with a host and port
const server = new Hapi.Server();
server.connection = { host: 'localhost', port: 3000 };

// Register logging plugin
server.register({ register: Good, options: config.goodOptions });

// Register Swagger Plugin
server.register([Inert, Vision, {register: HapiSwagger, options: config.swaggerOptions}]);

// Register routes
server.route(Routes);

// Start the server
async function start() {
    try {
        await server.start();
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
    server.log('info', `Server running at: ${server.info.uri}`);
};

start();
