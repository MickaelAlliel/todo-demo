'use strict';
const express = require('express');
const app = express();
const logger = require('morgan')
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const dbConnection = require('./src/utils/dbConnection');
const IndexRoutes = require('./src/routes/index');
const TodosRoutes = require('./src/routes/todo');
const UsersRoutes = require('./src/routes/user');

// Initialize Logging
app.use(logger("combined"));

// Initialize CORS
app.use(cors());

// Initialize Parsers
app.use(bodyParser.json());

// Initialize Routes
app.use('/', IndexRoutes);
app.use('/todos', TodosRoutes);
app.use('/users', UsersRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    return res.send({statusCode: err.status || 500, error: true, message: err.message});
});

// Start the server
app.listen(config.port, () => {
    console.log(`API Listening on http://localhost:${config.port}/`);
});
