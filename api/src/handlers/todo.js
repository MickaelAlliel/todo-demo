const Boom = require('boom');
const UserModel = require('../models/user');
const TodoModel = require('../models/todo');


exports.GetAllTodos = async (request, h) => {
    const query = TodoModel.find({}).populate('author');
    try {
        var todos = await query.exec();
    } catch (err) {
        return Boom.internal('Could not find todos', err);
    }
    if (!todos) {
        return Boom.notFound('Zero todos found');
    }
    return {statusCode: 200, error: false, message: todos}
};

exports.GetUserTodos = async (request, h) => {
    if (!request.params.id) {
        throw Boom.badRequest('User ID is a required parameter')
    }
    let userId = request.params.id;
    const query = TodoModel.find({author: userId}).populate('author');
    try {
        var todos = await query.exec();
    } catch (err) {
        return Boom.internal('Could not find todos', err);
    }
    if (!todos) {
        return Boom.notFound('Todos not found');
    }
    return {statusCode: 200, error: false, message: todos}
};

exports.AddTodo = async (request, h) => {
    if (!request.payload || !request.payload.title || !request.payload.userId) {
        throw Boom.badRequest('Missing required payload parameters');
    }
    var todo = new TodoModel();
    todo.title = request.payload.title;
    todo.author = request.payload.userId;
    await todo.save(err => {
        if (err) throw Boom.internal('Could not save new todo', err);
    });
    return {statusCode: 200, error: false, message: todo}
};

exports.UpdateTodo = async (request, h) => {
    if (!request.params.id) {
        throw Boom.badRequest('Missing required parameter Todo ID');
    }
    let todoId = request.params.id;
    const query = TodoModel.findById(todoId).populate('author');
    try {
        var todo = await query.exec();
    } catch (err) {
        return Boom.internal('Could not find todo', err);
    }
    if (!todo) {
        return Boom.notFound('Todo not found');
    }
    if (request.payload.title) {
        todo.title = request.payload.title;
    }
    if (request.payload.completed) {
        todo.completed = request.payload.completed;
    }
    await todo.save(err => {
        if (err) throw Boom.internal('Could not save todo', err);
    });
    return {statusCode: 200, error: false, message: ''}

};

exports.DeleteTodo = async (request, h) => {
    if (!request.params.id) {
        throw Boom.badRequest('Missing required parameter Todo ID');
    }
    let todoId = request.params.id;
    const query = TodoModel.findById(todoId);
    try {
        var todo = await query.exec();
    } catch (err) {
        return Boom.internal('Could not find todo', err);
    }
    if (!todo) {
        return Boom.notFound('Todo not found');
    }
    await todo.remove(err => {
        if (err) throw Boom.expectationFailed('Could not delete todo', err);
    });
    return {statusCode: 200, error: false, message: 'Successfully deleted todo'}
};

exports.DuplicateTodo = async (request, h) => {
    if (!request.params.id) {
        throw Boom.badRequest('Missing required parameter Todo ID');
    }
    let todoId = request.params.id;
    const query = TodoModel.findById(todoId);
    try {
        var todo = await query.exec();
    } catch (err) {
        return Boom.internal('Could not find todo', err);
    }
    if (!todo) {
        return Boom.notFound('Todo not found');
    }
    var duplicatedTodo = new TodoModel();
    duplicatedTodo.title = todo.title;
    duplicatedTodo.completed = todo.completed;
    duplicatedTodo.author = todo.author;
    await duplicatedTodo.save(err => {
        if (err) throw Boom.internal('Could not save todo', err);
    });
    return {statusCode: 200, error: false, message: duplicatedTodo}
};