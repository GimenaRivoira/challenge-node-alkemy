var express = require('express');
var router = express.Router();

const {getAll, getOne, create, edit, remove, search} = require('../API/characterController');

router.get('/', getAll);  
router.get('/:id', getOne); 
router.post('/create', create);
router.put('/edit/:id', edit);
router.delete('/delete/:id', remove);
router.get('/filter', search);
module.exports = router;
