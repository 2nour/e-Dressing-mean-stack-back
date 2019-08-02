const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const product =require('./conrollers/ProductController')
const client =require('./conrollers/clientController')
const cart =require('./conrollers/cartController')
const admin=require('./conrollers/adminController')


var app =express();

app.use(bodyParser.json());
app.use(express.static('assets'));
app.use(cors());

var port=3000;


app.use('/product',product);
app.use('/client',client);
app.use('/cart',cart)
app.use('/admin',admin)


app.listen(port,function () {
    console.log('App listening on port 3000!')
  });

