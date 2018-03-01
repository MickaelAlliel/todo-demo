const todoRoutes = require('./todo');
const userRoutes = require('./user');

const statusRoute = {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return {statusCode: 200, error: false, message: 'Uptime: ' + process.uptime()}
    }
}

module.exports = [statusRoute].concat(todoRoutes, userRoutes);