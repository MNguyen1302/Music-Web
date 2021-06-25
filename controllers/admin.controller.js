const User = require('../models/user.model');
const Song = require('../models/song.model');

const moment = require('moment');
const cloudinary = require('../services/cloudinary');

async function checkUser(req, res) {
    const id = req.signedCookies.userId;
    const user = await User.findOne({_id: id});
    if(!user) return false;
    else return user;
}
class AdminController {
    async index(req, res) {
        res.render('post', { title: 'Post'})
    }
    
    async store(req, res) {
        const user = await checkUser(req, res);
        const songs = await Song.find({writerId: user._id});
        res.render('mypost', { 
            title: 'My Post',
            songs: songs,
            moment: moment
        })
    }

    async edit(req, res) {
        Song.findOne({_id: req.params.id})
            .then(song => {
                res.render('edit', {
                    title: 'Edit',
                    song: song
                })
            })
    }

    async editSong(req, res) {
        if(req.files['audio']) {
            let audioPromises = req.files['audio'].map(file => new Promise((resolve, reject) => {
                cloudinary.upload(file, 'audio', 'video', resolve);
            }))

            const audio = await Promise.all(audioPromises);
            req.body.audio = audio[0].url;
        }

        if(req.files['image']) {
            let imagePromises = req.files['image'].map(file => new Promise((resolve, reject) => {
                cloudinary.upload(file, 'image', 'image', resolve);
            }))

            const image = await Promise.all(imagePromises);
            req.body.image = image[0].url;
        }

        Song.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/admin/store'))
            .catch(error => console.log(error))
    }

    async postSong(req, res) {
        const user = await checkUser(req, res);

        if(!req.body.name || !req.body.artist || !req.body.composer || !req.body.lyric || !req.files['audio'] || !req.files['image']) {
            res.render('post', {
                title: 'Post',
                error: ['One field is required']
            })
            return;
        }

        let audioPromises = req.files['audio'].map(file => new Promise((resolve, reject) => {
            cloudinary.upload(file, 'audio', 'video', resolve);
        }))

        let imagePromises = req.files['image'].map(file => new Promise((resolve, reject) => {
            cloudinary.upload(file, 'image', 'image', resolve);
        }))

        const audio = await Promise.all(audioPromises);
        const image = await Promise.all(imagePromises);

        const song = new Song({
            name: req.body.name,
            artist: req.body.artist,
            composer: req.body.composer,
            lyric: req.body.lyric,
            type: req.body.type,
            image: image[0].url,
            audio: audio[0].url,
            writerId: user._id
        })
        song.save()
            .then(() => res.redirect('/admin/store'))
            .catch(error => {
                console.log(error);
                res.render('error/404error', {layout: './error/404error'});
            })
    }

    async deleteSong(req, res) {
        Song.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(error => {
                console.log(error);
            })
    }

}

module.exports = new AdminController();