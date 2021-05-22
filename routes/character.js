var express = require('express');
var router = express.Router();

const {getAll, getOne, create, edit, remove, search} = require('../API/characterController');

const verifyToken = require('../middleware/authMiddleware');

router.get('/', getAll);  
router.get('/:id', getOne); 
router.post('/create',verifyToken, create);
router.put('/edit/:id',verifyToken, edit);
router.delete('/delete/:id',verifyToken, remove);
router.get('/filter', search);
module.exports = router;
