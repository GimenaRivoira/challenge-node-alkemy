var express = require('express');
var router = express.Router();

const {} = require('../controller/characterController');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });  

module.exports = router;
