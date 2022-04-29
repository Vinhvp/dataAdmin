//model productDetails
const productDetails = require('../../models/productDetails');
const productLists = require('../../models/productLists');
class ProductDetailsController{
    //[GET] /
    async productDetails(req, res){
        const productDetail = await productLists.find({})
        
        res.status(200).send(productDetail);
    }

}

module.exports = new ProductDetailsController;