const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const { Product } = require('../models/products');
const { mongoose } = require('./../db/config');
const multer = require('multer');
const multiPart = require('connect-multiparty');
const { ShoppingCart } = require('./../models/shoppingCart')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    }, filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
    }
});

const fileFilter = (req, file, cb) => {
    //reject
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    else {
        cb(new console.error({ message: 'file must be an img (jpg or png only)' }), false);


    }

}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fieldSize: 1024 * 1024 * 5
    }
})




const mPmiddleware = multiPart({ uploadDir: './assets' })


var app = express();
app.use(bodyParser.json());



app.post("/AddProduct", mPmiddleware, (req, res) => {


    let data = JSON.parse(req.body.product);
    let image = req.files.image;
    let ext = image.type.split('/')[1];
    let imagePath = "./assets/" + data._productName + "." + ext;
    fs.renameSync(req.files.image.path, imagePath);
    let im = "http://localhost:3000/" + data._productName + "." + ext;



    let prod = new Product({
        productName: data._productName,
        productDisc: data._productDisc,
        productPrice: data._productPrice,
        productQuantity: data._productQuantity,
        productPic: im,
        idSeller: ""
    })

    prod.save().then((pro) => {

        console.log(pro);

        res.status(200).send(pro);

    }).catch((err) => {
        res.status(400).send({
            message: "erreur : " + err
        })
    });


});




app.get('/getAll', (req, res) => {

    Product.find((err, docs) => {
        if (!err) {
            res.status(200).send(docs);
        }
        else { console.log("error in retriving items" + jason.stringify(err, undefined, 2)); }

    })

});


app.get('/getByCategory/:s', (req, res) => {

    let s =req.params.s;
    console.log(s);
  console.log('aaaa');

    Product.find({productDisc: s},(err, docs) => {
        if (!err) {
            res.status(200).send(docs);
        }
        else { console.log("error in retriving items" + jason.stringify(err, undefined, 2)); }

    })

});




module.exports = app;
