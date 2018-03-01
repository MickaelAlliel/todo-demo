var config = require('../../config');
var mongoose = require('mongoose');

mongoose.connect(config.dbUri, {useMongoClient: true});

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