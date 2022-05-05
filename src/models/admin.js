const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const admin = new Schema({
    email: {type: String, require: true},
    password: {type: String, require: true}
})

module.exports = mongoose.model('accountAdmin',admin);