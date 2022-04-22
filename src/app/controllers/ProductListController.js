const productLists = require('../../models/productLists');
class ProductListController{
    //[GET] /
    async productList(req, res){
        const productList = await productLists.find({})
        res.status(200).send(productList);
    }

}

module.exports = new ProductListController;