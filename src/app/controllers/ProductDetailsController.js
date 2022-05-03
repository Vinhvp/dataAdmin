//model productDetails
const productDetails = require('../../models/productDetails');
const productLists = require('../../models/productLists');

class ProductDetailsController{
    //[GET] /
    async productDetails(req, res){
        
        const productDetail = await productLists.find({})
        res.json({status: 200, products: productDetail})
    
        // res.status(200).send(productDetail);
    }

    async checkstock(req,res){
       //stay in product detail when you get data from product list
        const size = req.query.sizes;
        const sizes = 'size'+size;
        const id = req.query.id;
        const check = await productLists.findOne(({_id: id}));
        
        const s = check['sizeS'];
        const l = check['sizeL'];
        const m =check['sizeM'];    
        res.json({data: {sizeS: s, sizeM: m, sizeL: l}})
        // const getObj = (size) => {
        //     console.log(size);
        //     const a = stock.filter((e)=> Object.keys(e)===size);
        //     console.log(a);
        // }
        // getObj(sizes);
    
        // const quantity = check.stock.filter((item)=> {
        //     console.log(item.size);  
        //     return item.size});
        // console.log(quantity);
    }

}

module.exports = new ProductDetailsController;