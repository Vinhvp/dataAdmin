const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderLists = new Schema({
    title: String,
    price: Number,
    id: String,
    size: String,
    date: String,
    quantity: Number,

})
module.exports = mongoose.model('orderListsModel',orderLists);