const express = require('express');

const router = express.Router();

const controller = require('../controllers/profile.controller');

router.get('/', controller.index);

router.put('/update', controller.update);

router.put('/change/password', controller.changePassword);

module.exports = router;