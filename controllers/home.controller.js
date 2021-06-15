const User = require('../models/user.model');

async function checkUser(req, res) {
    const id = req.signedCookies.userId;
    const user = await User.findOne({_id: id});
    if(!user) return false;
    else return user;
}
class HomeController {
    async index(req, res) {
        const user = await checkUser(req, res);
        if(!user) {
            res.render('index', { 
                title: 'Home'
            })
        }
        res.render('index', {
            title: 'Home',
            user: user
        })
    }

    async logout(req, res) {
        res.clearCookie('userId')
        res.redirect('/');
    }
}
module.exports = new HomeController();