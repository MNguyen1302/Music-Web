const express = require('express');

const router = express.Router();

const controller = require('../controllers/song.controller');

const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', controller.index);

router.get('/:slug', controller.show);

router.post('/:slug', authMiddleware.requireAuth, controller.postComment);

router.post('/:slug/like', controller.likeSong);

module.exports = router;