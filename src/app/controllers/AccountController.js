
const accounts = require('../../models/account');
const mailServers = require('../../mailServer/mailServer');
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
        await accounts.findOneAndUpdate({email: record.email},{verify: record.verify},{
            new: true
        } );
        res.json({status:'true'})
        
    }
    async login(req,res){
        const record = req.body;
        let account = accounts.findOne({email: record.email},(err,acc)=>{
            if(err) return handleError(err);
            if(record.password === acc.password){
                res.json({password:'true'});
            }else{
                res.json({password:'false'});
            }
        });
    }
   

}

module.exports = new AccountController;