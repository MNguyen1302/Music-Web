const User = require('../models/user.model');
const Song = require('../models/song.model');

async function checkUser(req, res) {
    const id = req.signedCookies.userId;
    const user = await User.findOne({_id: id});
    if(!user) return false;
    else return user;
}
class HomeController {
    async index(req, res) {
        const songs = await Song.find({});
        const topsongs = await Song.find({}).sort({likeCount: -1});
        const user = await checkUser(req, res);
        if(!user) {
            res.render('index', { 
                title: 'Home',
                songs: songs,
                topsongs: topsongs
            })
        }
        res.render('index', {
            title: 'Home',
            user: user,
            songs: songs,
            topsongs: topsongs
        })
    }

    async logout(req, res) {
        res.clearCookie('userId')
        res.redirect('/');
    }

    async category(req, res) {
        const user = await checkUser(req, res);
        res.render('category', {
            title: 'Category',
            user: user
        })
    }
}
module.exports = new HomeController();