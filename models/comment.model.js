const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: { type: String},
    songSlug: { type: String},
    date: { type: Date}
})

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;