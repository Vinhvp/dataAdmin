const productLists = require('../../models/productLists');
class ProductListController{
    //[GET] /
    async productList(req, res){
        const page = req.query.pages;
        const cate = req.query.category;
        if(parseInt(page) >= 1){
            const pages = parseInt(page);
            const page_size = 20
            const skip = (pages - 1) * page_size;
            const productLengths = await productLists.find({category: cate})
            const productList = await productLists.find({category: cate})
            .skip(skip)
            .limit(page_size)
            res.status(200).send({product: productList, productLength: productLengths.length});
        }
    }
    async deleteList(req,res){
        const id = req.query.id;
        await productLists.deleteOne({_id: id})
    }

}

module.exports = new ProductListController;