const UserModel = require('../models/user');
const TodoModel = require('../models/todo');


exports.GetAllTodos = async (req, res, next) => {
    const query = TodoModel.find({}).populate('author');
    try {
        var todos = await query.exec();
    } catch (err) {
        return res.status(500).send({statusCode: 500, error: true, message: err});
    }
    if (!todos) {
        return res.status(400).send({statusCode: 200, error: true, message: 'No todos found'})
    }
    if (!res.headersSent) {
        return res.status(200).send({statusCode: 200, error: false, message: todos})
    }
};

exports.GetUserTodos = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).send({statusCode: 400, error: true, message: 'User ID is a required parameter'})
    }
    let userId = req.params.id;
    const query = TodoModel.find({author: userId}).populate('author');
    try {
        var todos = await query.exec();
    } catch (err) {
        return res.status(500).send({statusCode: 500, error: true, message: err});
    }
    if (!todos) {
        return res.status(404).send({statusCode: 404, error: true, message: 'No todos found'});
    }
    if (!res.headersSent) {
        return res.status(200).send({statusCode: 200, error: false, message: todos})
    }
};

exports.AddTodo = (req, res, next) => {
    if (!req.body || !req.body.title || !req.body.userId) {
        return res.status(400).send({statusCode: 400, error: true, message: 'Missing required payload parameter'})
    }
    var todo = new TodoModel();
    todo.title = req.body.title;
    todo.author = req.body.userId;
    todo.save(err => {
        if (err) return res.status(417).send({statusCode: 417, error: true, message: err})
        if (!res.headersSent) {
            return res.status(200).send({statusCode: 200, error: false, message: todo})
        }
    });
};

exports.UpdateTodo = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).send({statusCode: 400, error: true, message: 'Missing required parameter Todo ID'})
    }
    let todoId = req.params.id;
    const query = TodoModel.findById(todoId).populate('author');
    try {
        var todo = await query.exec();
    } catch (err) {
        return res.status(500).send({statusCode: 500, error: true, message: err})
    }
    if (!todo) {
        return res.status(404).send({statusCode: 404, error: true, message: 'Could not find todo'})
    }
    if (req.body.title) {
        todo.title = req.body.title;
    }
    if (req.body.completed) {
        todo.completed = req.body.completed;
    }
    todo.save(err => {
        if (err) return res.status(417).send({statusCode: 417, error: true, message: err})
        if (!res.headersSent) {
            return res.status(200).send({statusCode: 200, error: false, message: todo})
        }
    });
};

exports.DeleteTodo = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).send({statusCode: 400, error: true, message: 'Missing required parameter Todo ID'});
    }
    let todoId = req.params.id;
    const query = TodoModel.findById(todoId);
    try {
        var todo = await query.exec();
    } catch (err) {
        return res.status(500).send({statusCode: 500, error: true, message: err});
    }
    if (!todo) {
        return res.status(404).send({statusCode: 404, error: true, message: 'Todo not found'});
    }
    todo.remove(err => {
        if (err) res.status(417).send({statusCode: 417, error: true, message: err});
        if (!res.headersSent) {
            res.status(200).send({statusCode: 200, error: false, message: 'Successfully deleted todo'})
        }
    });
};

exports.DuplicateTodo = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).send({statusCode: 400, error: true, message: 'Missing required parameter Todo ID'});
    }
    let todoId = req.params.id;
    const query = TodoModel.findById(todoId);
    try {
        var todo = await query.exec();
    } catch (err) {
        return res.status(500).send({statusCode: 500, error: true, message: err});
    }
    if (!todo) {
        return res.status(404).send({statusCode: 404, error: true, message: 'Todo not found'});
    }
    var duplicatedTodo = new TodoModel();
    duplicatedTodo.title = todo.title;
    duplicatedTodo.completed = todo.completed;
    duplicatedTodo.author = todo.author;
    duplicatedTodo.save(err => {
        if (err) return res.status(417).send({statusCode: 417, error: true, message: err});
        if (!res.headersSent) {
            return res.status(200).send({statusCode: 200, error: false, message: duplicatedTodo})
        }
    });
};