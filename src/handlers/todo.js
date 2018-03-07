exports.GetAllTodos = async (req, res, next) => {
    const todos = await global.Store.findAll();
    if (!todos) {
        return res.status(400).send({message: 'No todos found'})
    }
    if (!res.headersSent) {
        return res.status(200).send({message: todos})
    }
};

exports.AddTodo = async (req, res, next) => {
    if (!req.body || !req.body.title) {
        return res.status(400).send({message: 'Missing required payload parameter <Title>'})
    }
    let todo = {};
    todo.title = req.body.title;
    todo.completed = false;
    const response = await global.Store.save(todo);
    return res.status(200).send({message: response})
};

exports.UpdateTodo = async (req, res, next) => {
    if (!req.params.id || req.body.title == null || req.body.completed == null) {
        return res.status(400).send({message: 'Missing required parameters/payload'})
    }
    const todoId = req.params.id;
    const query = await global.Store.findById(todoId);
    let todo = query;
    if (!todo) {
        return res.status(404).send({message: 'Could not find todo'})
    }
    todo.title = req.body.title;
    todo.completed = req.body.completed;
    const response = await global.Store.save(todo, todoId);
    return res.status(200).send({message: response});
};

exports.DeleteTodo = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).send({message: 'Missing required parameter Todo ID'});
    }
    let todoId = req.params.id;
    const response = await global.Store.remove(todoId);
    return res.status(200).send({message: 'Deleted successfully'});
};

exports.DuplicateTodo = async (req, res, next) => {
    if (!req.params.id) {
        return res.status(400).send({message: 'Missing required parameter Todo ID'});
    }
    const todoId = req.params.id;
    const query = await global.Store.findById(todoId);
    let todo = query;
    if (!todo) {
        return res.status(404).send({message: 'Could not find todo'})
    }
    let newTodo = {};
    newTodo.title = todo.title;
    newTodo.completed = todo.completed;
    const response = await global.Store.save(newTodo);
    return res.status(200).send({message: response})
};

exports.ToggleAll = async (req, res, next) => {
    const query = await global.Store.ToggleAll();
    return res.status(200).send({message: 'Cleared all complete todos'})
};

exports.ClearCompleted = async (req, res, next) => {
    const query = await global.Store.ClearCompleted();
    return res.status(200).send({message: 'Cleared all complete todos'})
};