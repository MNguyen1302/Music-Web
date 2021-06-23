const express = require('express');

const router = express.Router();

const controller = require('../controllers/song.controller');

router.get('/', controller.index);

router.get('/:slug', controller.show);

router.post('/:slug', controller.postComment);

router.post('/:slug/like', controller.likeSong);

module.exports = router;