const User = require('../models/user.model');
const Song = require('../models/song.model');
const Comment = require('../models/comment.model');

const moment = require('moment');

class SongController {
    async index(req, res) {
        const user = await User.findOne({_id: req.signedCookies.userId});
        const songs = await Song.find({});
        res.render('allsong', {
            title: 'All Song',
            user: user,
            songs: songs
        })
    }

    async show(req, res) {
        const user = await User.findOne({_id: req.signedCookies.userId});
        Song.findOne({slug: req.params.slug})
            .then(async song => {
                const comments = await Comment.find({songSlug: req.params.slug}).populate('userId').sort({date: -1});
                let account;
                if (user) {
                    account = JSON.stringify({
                        _id: user._id,
                        name: user.name
                    });
                }
                else account = null;
                
                res.render('detail-song', {
                    title: `${song.name} - ${song.artist}`,
                    song: song,
                    user: user,
                    userlikes: JSON.stringify(song.userLikes),
                    account: account,
                    comments: comments,
                    moment: moment
                })
            })
    }

    async postComment(req, res) {
        const id = req.signedCookies.userId;

        const comment = await Comment({
            userId: id,
            content: req.body.content,
            songSlug: req.params.slug,
            date: new Date()
        })
        comment.save()
            .then(() => res.redirect('back'))
            .catch(error => console.log(error))
    }

    async likeSong(req, res) {
        Song.updateOne({ slug: req.params.slug }, {userLikes: req.body.userlikes, likeCount: req.body.likeCount})
        .then(() => res.send('Liked post'));
    }

}

module.exports = new SongController();