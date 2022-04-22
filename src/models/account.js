const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const account = new Schema({
    name: String,
    email: {type: String, require: true},
    password: {type: String, require: true},
})
module.exports = mongoose.model('accountModel',account);