const Boom = require('boom');
const UserModel = require('../models/user');
const TodoModel = require('../models/todo');


exports.GetAllTodos = (request, h) => {
    return {statusCode: 200, error: false, message: ''}
};

exports.GetUserTodos = (request, h) => {
    return {statusCode: 200, error: false, message: ''}
};

exports.AddTodo = (request, h) => {
    return {statusCode: 200, error: false, message: ''}
};

exports.UpdateTodo = (request, h) => {
    return {statusCode: 200, error: false, message: ''}
};

exports.DeleteTodo = (request, h) => {
    return {statusCode: 200, error: false, message: ''}
};

exports.DuplicateTodo = (request, h) => {
    return {statusCode: 200, error: false, message: ''}
};