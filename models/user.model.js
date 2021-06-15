const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, requried: true, unique: true},
    avatar: { type: String},
    email: { type: String , required: true, unique: true},
    password: { type: String, required: true},
    firstname: { type: String},
    lastname: { type: String},
    address: { type: String}
})
const User = mongoose.model('User', userSchema);
module.exports = User;