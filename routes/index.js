var express = require('express');
var router = express.Router();

const {arguments} = require('../API/indexController');

/* GET home page. */
router.get('/', arguments);

module.exports = router;
