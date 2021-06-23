const express = require('express');

const router = express.Router();

const controller = require('../controllers/admin.controller');

router.get('/post', controller.index);

router.get('/store', controller.store);

router.get('/edit/:id', controller.edit);

router.post('/post/song', controller.postSong);

router.put('/:id', controller.editSong);

router.delete('/delete/:id', controller.deleteSong);

module.exports = router;