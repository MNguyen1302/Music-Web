const express = require('express');
const passport = require('passport');

const router = express.Router();

const controller = require('../controllers/auth.controller');

router.get('/google', 
    passport.authenticate('google', { scope: ['profile', 'email']})
)

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/auth/login'}),
    (req, res) => {
        res.cookie('userId', req.user._id, {
            signed: true
        })
        return res.redirect('/');
    }
)

router.get('/login', controller.login);

router.get('/register', controller.register);

router.post('/login', controller.postLogin);

router.post('/register', controller.postRegister);

module.exports = router;