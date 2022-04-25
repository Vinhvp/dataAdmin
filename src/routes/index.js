const productListRouter = require('./productList');
const productDetailsRouter =require('./productDetails');
const accountRouter = require('./account');

function route(app){
    app.use('/productList',productListRouter)
    app.use('/productDetails', productDetailsRouter)
    app.use('/account',accountRouter)
    
    
    // const productLists = require('../models/productLists');
    // app.get('/productList/get', async function(req,res){
    //     const productList = await productLists.find({})
    //     res.status(200).send(productList);
    // })

    // const productDetails = require('.../models/productDetails');
    // app.get('/productDetails/get', async function(req,res){
    //     const productDetail = await productDetails.find({})
    //     console.log(req);
    //     res.status(200).send(productDetail);
    // })
}
module.exports = route;