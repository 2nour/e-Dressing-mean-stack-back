const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const userId = require('mongoose').Types.idUser;



const { mongooose } = require('./../db/config');
const { User } = require('./../models/client');
const { ShoppingCart } = require('./../models/shoppingCart')





var app = express();
app.use(bodyParser.json());




app.get("/getAllUser", (req, res) => {

    User.find({ statut: 'user' }).then((user) => {
        let nbUser = 0;
        user.forEach(element => {
            nbUser = nbUser + 1;
        });
        res.status(200).send({ nbUser });


    }).catch((err) => {
        res.status(400).send({
            message: "erreur : " + err
        });


    })

});





app.post("/inscription", (req, res) => {
    let data = req.body;

    let privateKey = 10;
    let hashedPassword = bcrypt.hashSync(data._motDePass, privateKey);

    var user = new User({
        nom: data._nom,
        prenom: data._prenom,
        email: data._email,
        tel: data._tel,
        motDePass: hashedPassword,

    });

    user.save().then(() => {

        res.status(200).send(user);

    }).catch((err) => {
        res.status(400).send({
            message: "erreur : " + err
        })
    });

});


app.post("/connection", (req, res) => {

    var data = req.body;
    let email = data._email;
    let motDePass = data._motDePass;

    User.findOne({ email }).then((user) => {

        if (!user) {
            res.status(400).send({ message: "email incorrect" })
        }

        if (!bcrypt.compareSync(motDePass, user.motDePass)) {
            res.status(404).send({ message: "mot de passe incorrect" })

        }

        let token = jwt.sign({ idClient: user._id, statut: user.statut }, "kts").toString();
        res.status(200).send({ token });

    }
    ).catch((err) => {
        res.status(400).send({
            message: "erreur : " + err
        })
    });

});



app.get("/getAllUser", (req, res) => {

    User.find(({ statut: 'user' }), (err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log("error in retriving users" + jason.stringify(err, undefined, 2)); }

    })

});



app.get("/getUserCard", (req, res) => {

    let token = req.headers.authorization;
    let i = jwt.verify(token, 'kts');


    ShoppingCart.findOne({ idClient: i.idClient }).then((doc) => {


        res.status(200).send(doc);

    }).catch((err) => {
        res.status(400).send({
            message: "erreur : " + err
        })
    })



})


app.put("/addCard/:id", (req, res) => {

    let token = req.headers.authorization;

    let i = jwt.verify(token, 'kts');
    let idCart = req.params.id;

    let data = req.body;

    let cart = {
        idClient: i.idClient
    }


    ShoppingCart.findByIdAndUpdate({ _id: idCart },{ $set: cart }, { new: true }, (err, doc) => {

        if (!err) { res.status(200).send(doc); }
        else {
            res.status(400).send(console.log("erreur de mise a jour" + err));
        }
    });

})

module.exports = app;