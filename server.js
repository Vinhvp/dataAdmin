const express = require('express');
require('dotenv').config();

const app = express();
const path = require('path');
const bodyParser = require('body-parser');
var morgan = require('morgan');
//MongoDB connect *server*
var cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/database';
mongoose.connect(url);
app.use(morgan('combined'))
app.use(bodyParser.json())

// console.log('note',Login);
// console.log('Modelllllll',mongoose.model('loginModel'));
// console.log(Login === mongoose.model('loginModel'));


////////////////////////////////////////////////////////////

////////////////////////////
const route = require('./src/routes/index');
///Routes init

route(app);
////////////////////NODEMAIL

// app.post('/productList/create', async (req, res) => {
//     const productList = req.body
// 	console.log(productList)
    
// 	// * CREATE (_C_RUD)
// 	const response = await productDetails.create(productList)
// 	console.log(response)
    
// 	res.json({ status: 'ok' })
// })




/////call server
app.listen(7000, function() {
    console.log('listening on 7000');
})
