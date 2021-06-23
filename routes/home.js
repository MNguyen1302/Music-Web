const express = require('express');

const controller = require('../controllers/home.controller');

const router = express.Router();

router.get('/', controller.index);

router.get('/home', controller.logout);

router.get('/category', controller.category);

module.exports = router;
