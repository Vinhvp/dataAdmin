const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//String, number, boolean, object
// 
// "img": 'https://images.unsplash.com/photo-1638011258204-58eff82104db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
//        "title": "Collete Stretch Linen Minidress",
//        "price": 40,
//        "category": 'ladies',
//        "id":1,
const productLists = new Schema({
    img: {type: String, require:true},
    title: String,
    price: Number,
    category: String,
    id: Number,
    description: String,
    size: String,
    color: String,
    quantity: Number,
    sizeS: Number,
    sizeM: Number,
    sizeL: Number,

})
module.exports = mongoose.model('productModel',productLists);