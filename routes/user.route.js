const express = require('express')
const router = express.Router()

const controller = require('../controller/user.controller')
const db = require('../db')

router.get('/', controller.index);
router.get('/seach', controller.search);
router.get('/create', controller.create);
router.post('/create', controller.postCreate);
router.get('/:id', controller.get);
router.get('/delete/:id',controller.delete)
module.exports =router;