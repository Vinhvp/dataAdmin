const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productDetails = new Schema({
    img: {type: String, require:true},
    title: String,
    price: Number,
    category: String,
    id: Number
})
module.exports = mongoose.model('productDetailModel',productDetails);