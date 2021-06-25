const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId: { type: String},
    name: { type: String, requried: true},
    avatar: { type: String},
    email: { type: String , required: true, unique: true, sparse:true},
    password: { type: String},
    firstname: { type: String},
    lastname: { type: String},
    address: { type: String}
})
const User = mongoose.model('User', userSchema);
module.exports = User;