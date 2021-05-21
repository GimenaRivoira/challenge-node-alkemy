var express = require('express');
var router = express.Router();

const {getAll, getOne, filter, create, edit} = require('../API/characterController');

router.get('/', getAll);  
router.get('/:id', getOne); 
router.post('/create', create);
router.put('/edit/:id', edit);
module.exports = router;
