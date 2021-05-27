var express = require('express');
var router = express.Router();

const emailController = require('../API/sendEmail');

router.post('/', emailController.send);

module.exports = router;