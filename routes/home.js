const express = require('express');

const controller = require('../controllers/home.controller');

const router = express.Router();

router.get('/', controller.index);

router.get('/home', controller.logout);

module.exports = router;
