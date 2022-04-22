//model productDetails
const productDetails = require('../../models/productDetails');

class ProductDetailsController{
    //[GET] /
    async productDetails(req, res){
        const productDetail = await productDetails.find({})
        
        res.status(200).send(productDetail);
    }

}

module.exports = new ProductDetailsController;