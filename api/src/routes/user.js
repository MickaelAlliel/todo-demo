const UserHandlers = require('../handlers/user');
var routes = [];

routes.push({
    method: 'GET',
    path: '/users/{id}',
    handler: UserHandlers.GetUserById
});

routes.push({
    method: 'POST',
    path: '/users',
    handler: UserHandlers.CreateUser
});

routes.push({
    method: 'DELETE',
    path: '/users/{id}',
    handler: UserHandlers.DeleteUser
});

module.exports = routes;