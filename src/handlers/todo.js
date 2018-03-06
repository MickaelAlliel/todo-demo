exports.GetAllTodos = async (req, res, next) => {
    const todos = await global.Store.findAll();
    if (!todos) {
        return res.status(400).send({statusCode: 200, error: true, message: 'No todos found'})
    }
    if (!res.headersSent) {
        return res.status(200).send({statusCode: 200, error: false, message: todos})
    }
};

exports.AddTodo = async (req, res, next) => {
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
    let todoId = req.params.id;
    const query = await global.Store.find({id: todoId});
    if (!todo) {
        return res.status(404).send({statusCode: 404, error: true, message: 'Could not find todo'})
    }
    let todo = query[0];
    if (req.body.title) {
        todo.title = req.body.title;
    }
    if (req.body.completed) {
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
    const query = await global.Store.find({id: todoId});
    if (!todo) {
        return res.status(404).send({statusCode: 404, error: true, message: 'Could not find todo'})
    }
    const response = await global.Store.remove(todoId);
    return res.status(200).send({statusCode: 200, error: false, message: 'Deleted all matching items'});
};

exports.DuplicateTodo = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).send({statusCode: 400, error: true, message: 'Missing required parameter Todo ID'});
    }
    let todoId = req.params.id;
    const query = await global.Store.find({id: todoId});
    if (!todo) {
        return res.status(404).send({statusCode: 404, error: true, message: 'Could not find todo'})
    }
    let todo = query[0];
    let newTodo = {};
    newTodo.title = todo.title;
    newTodo.completed = todo.completed;
    const response = await global.Store.save(newTodo);
    return res.status(200).send({statusCode: 200, error: false, message: response})
};