exports.GetAllTodos = async (req, res, next) => {
    const todos = await global.Store.findAll();
    if (!todos) {
        return res.status(400).send({statusCode: 200, error: true, message: 'No todos found'})
    }
    if (!res.headersSent) {
        return res.status(200).send({statusCode: 200, error: false, message: todos})
    }
};

exports.AddTodo = async (req, res, next) => { console.log(req.body);
    if (!req.body || !req.body.title) {
        return res.status(400).send({statusCode: 400, error: true, message: 'Missing required payload parameter <Title>'})
    }
    let todo = {};
    todo.title = req.body.title;
    todo.completed = false;
    const response = await global.Store.save(todo);
    return res.status(200).send({statusCode: 200, error: false, message: response})
};

exports.UpdateTodo = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).send({statusCode: 400, error: true, message: 'Missing required parameter Todo ID'})
    }
    const todoId = req.params.id;
    const query = await global.Store.findById(todoId);
    let todo = query;
    if (!todo) {
        return res.status(404).send({statusCode: 404, error: true, message: 'Could not find todo'})
    }
    if (req.body.title) {
        todo.title = req.body.title;
    }
    if (req.body.completed !== null) {
        todo.completed = req.body.completed;
    }
    const response = await global.Store.save(todo, todoId);
    return res.status(200).send({statusCode: 200, error: false, message: response});
};

exports.DeleteTodo = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).send({statusCode: 400, error: true, message: 'Missing required parameter Todo ID'});
    }
    let todoId = req.params.id;
    const response = await global.Store.remove(todoId);
    return res.status(200).send({statusCode: 200, error: false, message: 'Deleted successfully'});
};

exports.DuplicateTodo = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).send({statusCode: 400, error: true, message: 'Missing required parameter Todo ID'});
    }
    const todoId = req.params.id;
    const query = await global.Store.findById(todoId);
    let todo = query;
    if (!todo) {
        return res.status(404).send({statusCode: 404, error: true, message: 'Could not find todo'})
    }
    let newTodo = {};
    newTodo.title = todo.title;
    newTodo.completed = todo.completed;
    const response = await global.Store.save(newTodo);
    return res.status(200).send({statusCode: 200, error: false, message: response})
};