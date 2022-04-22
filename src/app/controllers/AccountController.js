
const accounts = require('../../models/account');
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
        // const handleError(err){
        //     console.log
        // }
        const checkExist = await accounts.findOne({email: record.email})
        console.log(checkExist);
        if(checkExist){
            res.json({status:'false'});
        }
        else{
            const account = await accounts.create(record);
            console.log(account);
            res.json({status:'true'});
        }
        // console.log(account);
        
        // console.log(record);
    }
   

}

module.exports = new AccountController;