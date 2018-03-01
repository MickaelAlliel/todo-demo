const TodoHandlers = require('../handlers/todo');
const Joi = require('joi');
var routes = [];

routes.push({
    method: 'GET',
    path: '/todos',
    config: {
        handler: TodoHandlers.GetAllTodos,
        description: 'Retrieves all existing todos',
        tags: ['api'],
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },
        validate: {
            
        }
    }
});

routes.push({
    method: 'GET',
    path: '/todos/user/{id}',
    config: {
        handler: TodoHandlers.GetUserTodos,
        description: 'Retrieves all todos owned by a specific user',
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
    path: '/todos',
    config: {
        handler: TodoHandlers.AddTodo,
        description: 'Creates a new Todo',
        tags: ['api'],
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },
        validate: {
            payload: {
                title: Joi.string().required(),
                userId: Joi.string().required()
            }
        }
    }
});

routes.push({
    method: 'PUT',
    path: '/todos/{id}',
    config: {
        handler: TodoHandlers.UpdateTodo,
        description: 'Updates an existing todo',
        tags: ['api'],
        plugins: {
            'hapi-swagger': {
                payloadType: 'form'
            }
        },
        validate: {
            params: {
                id: Joi.string()
            },
            payload: {
                title: Joi.string(),
                completed: Joi.boolean()
            }
        }
    }
});

routes.push({
    method: 'DELETE',
    path: '/todos/{id}',
    config: {
        handler: TodoHandlers.DeleteTodo,
        description: 'Delete a specific todo by ID',
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
    path: '/todos/duplicate/{id}',
    config: {
        handler: TodoHandlers.DuplicateTodo,
        description: 'Duplicate a todo',
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