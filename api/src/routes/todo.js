const TodoHandlers = require('../handlers/todoHandlers');
var todoRoutes = [];

todoRoutes.push({
    method: 'GET',
    path: '/todos',
    handler: TodoHandlers.GetAllTodos
});

todoRoutes.push({
    method: 'GET',
    path: '/todos/user/{id}',
    handler: TodoHandlers.GetUserTodos
});

todoRoutes.push({
    method: 'POST',
    path: '/todos',
    handler: TodoHandlers.AddTodo
});

todoRoutes.push({
    method: 'PUT',
    path: '/todos',
    handler: TodoHandlers.UpdateTodo
});

todoRoutes.push({
    method: 'DELETE',
    path: '/todos/{id}',
    handler: TodoHandlers.DeleteTodo
});

todoRoutes.push({
    method: 'POST',
    path: '/todos/duplicate/{id}',
    handler: TodoHandlers.DuplicateTodo
});


module.exports = todoRoutes;