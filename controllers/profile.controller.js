require('../middlewares/cloudinary.middleware')
const User = require('../models/user.model');

const bcrypt = require('bcryptjs');

const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { errorMonitor } = require('events');

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
                cloudinary.uploader.upload(file.path, { folder: 'avatar', user_filename: true, unique_filename: false, resource_type: 'image'}, (err, result) => {
                    if(err) resolve(err);
                    else {
                        fs.unlinkSync(file.path);
                        resolve({
                            url: result.url,
                            public_id: result.public_id
                        })
                    }
                })
            }))

            const avatar = await Promise.all(avatarPromises);
            req.body.avatar = avatar[0].url;
        }

        User.updateOne({_id: id}, req.body)
            .then(() => res.redirect('back'))
            .catch(error => {
                console.log(error);
                res.render('error/404error', {layout: './error/404error'});
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
                res.render('error/404error', {layout: './error/404error'});
            })
    }

}
module.exports = new ProfileController();