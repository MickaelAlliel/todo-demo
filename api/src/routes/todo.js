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

todo.Routes.push({
    method: 'POST',
    path: '/todos',
    handler: TodoHandlers.AddTodo
});

todo.Routes.push({
    method: 'PUT',
    path: '/todos',
    handler: TodoHandlers.UpdateTodo
});

todo.Routes.push({
    method: 'DELETE',
    path: '/todos/{id}',
    handler: TodoHandlers.DeleteTodo
});

todo.Routes.push({
    method: 'POST',
    path: '/todos/duplicate/{id}',
    handler: TodoHandlers.DuplicateTodo
});


export default todoRoutes;