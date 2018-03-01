const TodoHandlers = require('../handlers/todo');
var routes = [];

routes.push({
    method: 'GET',
    path: '/todos',
    handler: TodoHandlers.GetAllTodos
});

routes.push({
    method: 'GET',
    path: '/todos/user/{id}',
    handler: TodoHandlers.GetUserTodos
});

routes.push({
    method: 'POST',
    path: '/todos',
    handler: TodoHandlers.AddTodo
});

routes.push({
    method: 'PUT',
    path: '/todos',
    handler: TodoHandlers.UpdateTodo
});

routes.push({
    method: 'DELETE',
    path: '/todos/{id}',
    handler: TodoHandlers.DeleteTodo
});

routes.push({
    method: 'POST',
    path: '/todos/duplicate/{id}',
    handler: TodoHandlers.DuplicateTodo
});


module.exports = routes;