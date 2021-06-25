const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

class AuthController {
    async login(req, res) {
        res.render('auth/signin', {
            layout: './auth/signin'
        })
    }

    async register(req, res) {
        res.render('auth/signup', {
            layout: './auth/signup'
        })
    }

    async googleOAuth(req, res) {
        console.log(req.user);
        res.cookie('userId', req.user._id, {
            signed: true
        })
    }

    async postLogin(req, res) {
        let errors = [];

        const user = await User.findOne({ email: req.body.email});

        if(user) {
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if(validPassword) {
                res.cookie('userId', user._id, {
                    signed: true
                })
                return res.redirect('/');
            } else {
                errors.push('Wrong')
            }
        } else {
            errors.push('Wrong')
        }

        if(errors.length) {
            res.render('auth/signin', {
                layout: './auth/signin',
                error: ['Wrong email or password'],
                values: req.body
            })
            return;
        }
    }

    async postRegister(req, res) {
        console.log(req.body);
        let errors = [];

        const name = req.body.name;
        const email = req.body.email
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;

        await User.find({ name: name }, (err, name) => {
            if(name.length) errors.push('Username is already in use')
        })
        await User.find({ email: email }, (err, email) => {
            if(email.length) errors.push('Email is already in use');
        })

        if(!name || !email || !password || !confirmpassword) {
            errors.push('One field is required');
        }
        if(password !== confirmpassword) {
            errors.push('Confirm password is not matching');
        }
        if(errors.length) {
            res.render('auth/signup', {
                layout: './auth/signup',
                errors: errors,
                values: req.body
            })
            return;
        }

        const salt = await bcrypt.genSalt();
        req.body.password = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: name,
            email: email,
            password: req.body.password
        })
        user.save()
            .then(() => {return res.redirect('/auth/login')})
    }
}
module.exports = new AuthController();