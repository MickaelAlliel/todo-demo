'use strict';
const Hapi = require('hapi');
const Good = require('good');
const HapiSwagger = require('hapi-swagger');
const Vision = require('vision');
const Inert = require('inert');
const config = require('./config');
const dbConnection = require('./src/utils/dbConnection');
const Routes = require('./src/routes');

// Create a server with a host and port
const server = new Hapi.Server({ host: 'localhost', port: 3000 });

async function registerServer() {
    // Register routes
    await server.route(Routes);

    // Register logging and documentation plugin
    await server.register([
        Inert,
        Vision,
        { plugin: HapiSwagger, options: config.swaggerOptions },
        { plugin: Good, options: config.goodOptions }
    ], {
        //routes: { prefix: '/api' }
    });
}

// Start the server
async function start() {
    try {
        await registerServer();
        await server.start();
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
    server.log('info', `Server running at: ${server.info.uri}`);
};

start();
