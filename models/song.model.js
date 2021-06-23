const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const songSchema = new Schema({
    writerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: { type: String, required: true},
    artist: { type: String, required: true},
    composer: { type: String, required: true},
    type: { type: String},
    image: { type: String, required: true},
    audio: { type: String, required: true},
    lyric: { type: String, required: true},
    slug: { type: String, slug: 'name', unique: true},
    userLikes: { type: Array, default: []},
    likeCount: { type: Number, default: 0}
},{
    timestamps: true
})

const Song = mongoose.model('Song', songSchema);
module.exports = Song;