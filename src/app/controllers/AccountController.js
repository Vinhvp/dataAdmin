
const accounts = require('../../models/account');
const mailServers = require('../../mailServer/mailServer');
const mailUpdatePassword = require('../../mailServer/mailUpdatePassword');
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const resetPasswords = require('../../mailServer/resetPass.service');
const hashPass = async (pass) =>{
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);
    return hashedPassword;
}

class AccountController{
    //[GET] /
    async Accounts(req, res){
        const account = await accounts.find({})
        res.status(200).send(account);
    }
    //[isValid]
    async Accounts(req, res){
        const account = await accounts.find({})
        res.status(200).send('is Valid Email !! pleased try again');
    }
    //[Update]
    async updateAccounts(req,res){
        const record = req.body;
        const checkExist = await accounts.findOne({email: record.email})
        if(checkExist){
            res.json({status:'false'});
        }
        else{
            const account = await accounts.create(record);
            mailServers(record.email);
            res.json({status:'true', email:`${record.email}`});
        }
    }
    async updateVerify(req,res){
        const record = req.body;
         // Hash password before saving to database
        const check = await accounts.findOne({email: record.email});
        const passwords = check.password;
        await accounts.findOneAndUpdate({email: record.email},{verify: record.verify, password: await hashPass(passwords)},{
            new: true
        } );
        const emails = record.email;
        console.log(emails);
        const accessToken = await JWT.sign(
            { emails },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1m",
            }
          );
        console.log(accessToken);
          res.json({
            token: accessToken,
            status: 'true'
          });
        
    }
    async login(req,res){
        const record = req.body;
        const check = await accounts.findOne({email: record.email});
        const emails = record.email;
        const accessToken = await JWT.sign(
            { emails },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1m",
            }
          );
        bcrypt.compare(record.password, check.password, function(err, result) {
            // result == true
            if(result) res.json({password:'true', token: accessToken, name: check.name});
            else res.json({password:'false'});
        });
    }
    async addProducts(req,res){
        const record = req.body;
        const product = {"id": record.id, "quantity": record.quantity, "size":record.size};
        await accounts.findOneAndUpdate({email: record.user}, {$push: {products: product}},{
            new: true
        });
        res.json({status: "okay"});
    }
    async getProducts(req,res){
        const users = req.query;
        accounts.findOne({email: users.user},(err,obj)=>{
            if(err) console.log(err);
            res.json(obj);
        });
    }
    async updatePassword(req,res){
        const record = req.body;
        // Hash password before saving to database
        const check = await accounts.findOne({email: record.user});
        console.log('hash newPass',await hashPass(record.newPasswords));
        bcrypt.compare(record.oldPasswords, check.password, async function(err, result) {
            // result == true
            if(result) {
                await accounts.findOneAndUpdate({email: record.user}, {password: await hashPass(record.newPasswords)},{
                    new: true
                }); 
                res.json({password:'true'});
            }else{
                res.json({password:'false'})
            }
            
        });
    }
    async updatePasswordAgain(req,res){
        const record = req.body;
        const check = await accounts.findOne({email: record.email});
        const randomPassword = resetPasswords()
        if(check){
            mailUpdatePassword(record.email, randomPassword);
            await accounts.findOneAndUpdate({email: record.email}, {password: await hashPass(randomPassword)},{
                new: true
            }); 
            res.json({password:'true'});
        }
       
        // const check = await accounts.findOne({email: record.user});
    }
   
   

}

module.exports = new AccountController;
