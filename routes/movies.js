var express = require('express');
var router = express.Router();

const {} = require('../controller/moviesController');

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });
  

module.exports = router;