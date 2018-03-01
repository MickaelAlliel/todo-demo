const UserHandlers = require('../handlers/user');
const Joi = require('joi');
var routes = [];

routes.push({
    method: 'GET',
    path: '/users/{id}',
    config: {
        handler: UserHandlers.GetUserById,
        description: 'Retrieves a user by its ID',
        tags: ['api'],
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },
        validate: {
            params: {
                id: Joi.string().required()
            }
        }
    }
});

routes.push({
    method: 'POST',
    path: '/users',
    config: {
        handler: UserHandlers.CreateUser,
        description: 'Creates a new user',
        tags: ['api'],
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },
        validate: {
            payload: {

            }
        }
    }
});

routes.push({
    method: 'DELETE',
    path: '/users/{id}',
    config: {
        handler: UserHandlers.DeleteUser,
        description: 'Delete the specified user',
        tags: ['api'],
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },
        validate: {
            params: {
                id: Joi.string().required()
            }
        }
    }
});

module.exports = routes;