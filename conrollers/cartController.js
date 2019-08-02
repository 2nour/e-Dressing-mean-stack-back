const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const userId = require('mongoose').Types.idUser;



const { mongooose } = require('./../db/config');
const { ShoppingCart } = require('./../models/shoppingCart')





var app = express();
app.use(bodyParser.json());


app.get('/addCart', (req, res) => {

    let addCart = new ShoppingCart({
        products: [],
        quantity: "0",
        idClient: "null"


    })

    addCart.save().then(() => {
        res.status(200).send(addCart._id);

    }).catch((err) => {
        res.status(400).send({
            message: "erreur : " + err
        })
    });


});


app.put('/addItemToCart/:id', (req, res) => {

    let id = req.params.id;
    let data = req.body;


    //  console.log(data);


    ShoppingCart.findOneAndUpdate({ _id: id }, { $inc: { quantity: 1 }, $push: { products: data } }, { new: true }, (err, doc) => {

        if (!err) {
            res.status(200).send(doc);
            console.log(doc);

        }
        else {
            res.status(400).send(console.log("erreur de mise a jour" + err));
        }
    });

})

app.put('/removeFromCart/:id', (req, res) => {

    let id = req.params.id;
    let data = req.body;



    ShoppingCart.findOneAndUpdate({ products : data, _id : id },{}, (err, doc) => {

        if (!err) {
            res.status(200).send(doc);
            console.log(doc);

        }
        else {
            res.status(400).send(console.log("erreur de mise a jour" + err));
        }
    });
 


})


app.put("/removeFromCart/:id", (req, res) => {

    
    let id = req.params.id;
    let data = req.body;



    let quantite = req.body.quantite;
    let shoppingCart;
    let ps = [];


    var obj = { prod, quantite };

    ShoppingCart.findOne({ _id: id }).then((cart) => {
        if (cart) {
            ps = cart.products;
            console.log("zz"+ps);
            
            ps.splice(ps.indexOf(obj));
            shoppingCart = new ShoppingCart({
                _id: idCart,
                idUser: cart.idUser,
                products: ps
            })
            console.log("+ps+"+ps);
            

            ShoppingCart.findByIdAndUpdate({ _id: idCart }, { $set: shoppingCart }, { new: true }, (err, doc) => {

                if (!err) {
                    res.status(200).send(doc);
                }
                else {
                    res.status(400).send(console.log("erreur de mise a jour" + err));
                }

            })
        }
    });
});


module.exports = app;