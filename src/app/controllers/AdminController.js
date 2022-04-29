const admin = require('../../models/admin'); //model Schema
const mailServers = require('../../mailServer/mailServer');
const mailUpdatePassword = require('../../mailServer/mailUpdatePassword');
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const resetPasswords = require('../../mailServer/resetPass.service');
const productLists = require('../../models/productLists');
const hashPass = async (pass) =>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);
    return hashedPassword;
}

class AdminController{
   async login(req,res){
        const record = req.body;
        const check = await admin.findOne({email: record.email});
        if(check){
            bcrypt.compare(record.password, check.password, async function(err,result){
                if(result){
                    const emails = record.email;
                    const accessToken = await JWT.sign(
                    { emails },
                    process.env.ACCESS_TOKEN_SECRET,
                    {
                        expiresIn: "1m",
                    }
                    );
                    res.json({status: 'good', token: accessToken});
                }
                else{
                    res.json({status: 'bad'});
                }
            })
        }
   }
      
      
    
    
   async forgot(req,res){
    const randomPassword = resetPasswords();
    console.log(randomPassword);
    mailUpdatePassword('vinhvp@dgroup.co', randomPassword, 'http://localhost:8888/');
    await admin.findOneAndUpdate({email: 'vinhvp@dgroup.co'}, {password: await hashPass(randomPassword)},{
        new: true
    }); 
    res.json({status: 'send!!'})
   }
   
   async getProducts(req,res){
       const page = req.query.pages;
       if(parseInt(page) >=1 ){
           const pages = parseInt(page);
           const page_size = 7;
           const skip = (pages - 1)*page_size;
           const productLength = (await productLists.find({})).length;
           
           const products = await productLists.find({})
           .skip(skip)
           .limit(page_size);
           res.json({products: products, length: productLength});
    }
   }
   async postProduct(req,res){
       const record = req.body.products;
       const product = new productLists({
            img: record.img,
            title: record.title,
            price: parseInt(record.price),
            category: record.category
        })
        product.save((err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                console.log(result);
                res.json({status:true})
            }
        })

   }
}

module.exports = new AdminController;
