const express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({statusCode: 200, error: false, message: 'Uptime: ' + process.uptime()})
});

module.exports = router;