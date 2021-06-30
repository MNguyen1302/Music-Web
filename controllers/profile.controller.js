const User = require('../models/user.model');

const bcrypt = require('bcryptjs');

const cloudinary = require('../services/cloudinary');

async function checkUser(req, res) {
    const id = req.signedCookies.userId;
    const user = await User.findOne({_id: id});
    if(!user) return false;
    else return user;
}
class ProfileController {
    async index(req, res) {
        const user = await checkUser(req, res);
        res.render('profile', {
            title: 'Profile',
            user: user
        })
    }

    async update(req, res) {
        const id = req.signedCookies.userId;

        if(req.files['avatar']) {
            let avatarPromises = req.files['avatar'].map(file => new Promise((resolve, reject) => {
                cloudinary.upload(file, 'avatar', 'image', resolve);
            }))

            const avatar = await Promise.all(avatarPromises);
            req.body.avatar = avatar[0].url;
        }

        User.updateOne({_id: id}, req.body)
            .then(() => res.redirect('back'))
            .catch(error => {
                return res.status(400).redirect('/error/notfound');
            })
    }

    async changePassword(req, res) {
        let errors = [];

        const user = await checkUser(req, res);

        const salt = await bcrypt.genSalt();
        const validPassword = await bcrypt.compare(req.body.currentpassword, user.password);
 
        if(!req.body.currentpassword || !req.body.password || !req.body.confirmpassword) {
            errrors.push('One field is required');
        }

        if(req.body.password !== req.body.confirmpassword) {
            errors.push('Confirm password is not matching');
        }

        if(!validPassword) {
            errors.push('Current password is wrong');
        }

        if(errors.length) {
            res.render('profile', {
                errors: errors
            })
            return;
        }

        req.body.password = await bcrypt.hash(req.body.password, salt);
        User.updateOne({_id: user._id}, {password: req.body.password})
            .then(() => res.redirect('back'))
            .catch(error => {
                console.log(error);
                return res.status(400).redirect('/error/notfound');
            })
    }

}
module.exports = new ProfileController();