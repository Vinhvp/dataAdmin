const admin = require('../../models/admin'); //model Schema
const mailServers = require('../../mailServer/mailServer');
const mailUpdatePassword = require('../../mailServer/mailUpdatePassword');
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const resetPasswords = require('../../mailServer/resetPass.service');
const productLists = require('../../models/productLists');
const orderLists = require('../../models/orderList');
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
            category: record.category,
            description: record.description,
            sizeL: record.quantity,
            sizeM: record.quantity,
            sizeS: record.quantity,
            sold: record.sold
        })
        product.save((err,result)=>{
            if(err){
                console.log(err);
            }
            else{
                res.json({status:true})
            }
        })

   }
   async getOrders(req,res){
        const page = req.query.pages;
        if(parseInt(page) >=1 ){
            const pages = parseInt(page);
            const page_size = 10;
            const skip = (pages - 1)*page_size;
            const orderLength = (await orderLists.find({})).length;
            
            const orderList = await orderLists.find({})
            .skip(skip)
            .limit(page_size);
            res.json({status:202, orderList: orderList, length: orderLength});
     }
   }
   async updateOrders(req,res){
      const record = JSON.parse(req.body.data);
      const date = req.body.date;
      //clone by destructuring
      const order = record.map((obj)=>{
          const {id,title,quantity,price,size,...rest} = obj;
          const newObj =  {id,title,quantity:Number(quantity),price: Number(price),size,date: date,status: 'pending'};
          return newObj;
      })
      order.forEach((item) =>{
          try{
              const checkout = orderLists.create(item);
              console.log(checkout);
          }
          catch(err){
              console.log(err);
          }
      })
      res.json({status:202});
   }
   async updateStatusOrders(req,res){
       console.log(req.body);
       const status = req.body.data;
       const id = req.body.id;
        if(status == 'cancel'){
            await orderLists.findOneAndUpdate({_id: id}, {status: status},{
                new: true
                }); 
            res.json({status:404});

        }else{
            const quantity = req.body.quantity;
            const tmp = await productLists.findOne({_id: req.body.id_sp});
            console.log(tmp);
            const solds = tmp.sold + quantity;
            await productLists.findOneAndUpdate({_id: req.body.id_sp},{sold: solds});
            await orderLists.findOneAndUpdate({_id: id}, {status: status},{
            new: true
            }); 
            res.json({status:202});
        }
      
   }
}

module.exports = new AdminController;
