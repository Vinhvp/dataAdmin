const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const account = new Schema({
    name: String,
    email: {type: String, require: true},
    password: {type: String, require: true},
    verify: {type: String},
    products: [{id: String, quantity: String, size: String}]
})
module.exports = mongoose.model('accountModel',account);