const { response } = require('express');
var express = require('express');
var router = express.Router();

const {getAll, getOne, create, edit, remove} = require('../API/moviesController');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/create', create);
router.put('/edit/:id', edit);
router.delete('/delete/:id', remove);

module.exports = router;
