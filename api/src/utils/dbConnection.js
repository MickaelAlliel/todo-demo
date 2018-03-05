var config = require('../../config');
var mongoose = require('mongoose');

var connectWithRetry = function() {
  return mongoose.connect(config.dbUri, function(err) {
    if (err) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec');
      setTimeout(connectWithRetry, 5000);
    }
  });
};

connectWithRetry();

mongoose.connection.on('connected', function () {
  console.log('mongodb connection established at : ' + config.dbUri);
});

mongoose.connection.on('error', function (err) {
  console.log('mongodb connection error : ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('mongodb disconnected from : ' + config.dbUri);
});

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('mongodb diconnected from : ' + config.dbUri + ' on SIGINT (process canceled).' );
    process.exit(0);
  });
});

require('../models');