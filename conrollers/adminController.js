const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const userId = require('mongoose').Types.idUser;

const { mongooose } = require('./../db/config');
const {  User } = require('./../models/client');

var app = express();
app.use(bodyParser.json());



app.get("/getAll", (req, res) => {

    Client.find((err, docs) => {
        if (!err) {
            res.send(docs);
        }
        else { console.log("error in retriving Clients" + jason.stringify(err, undefined, 2)); }

    })

});



app.put("/acitvate/:id", (req, res) => {

    let id = req.params.id;



    User.findById({ _id: id }).then((user) => {


        if (!user) {
            res.status(400).send(console.log("user not found" + err));
        }
        else {
            let e = user.etat;

            x: String;
            x = (e == "active") ? "desactive" : "active"

            var u = {
                etat: x
            }

            User.findByIdAndUpdate({ _id: user.id }, { $set: u }, { new: true }, (err, doc) => {
                if (!err) {
                    User.find({ statut: 'user' }).then((users) => {
                        res.status(200).send(users);

                    })
                }
                else {
                    res.status(400).send(console.log("erreur de mise a jour" + err));
                }
            });
        }

    });



})

app.put("/toAdmin/:id", (req, res) => {

    let id = req.params.id;



    User.findById({ _id: id }).then((user) => {


        if (!user) {
            res.status(400).send(console.log("user not found" + err));
        }
        else {
            let e = user.statut;

            x: String;
            x = (e == "admin") ? "user" : "admin"

            var u = {
                statut: x
            }

            User.findByIdAndUpdate({ _id: user.id }, { $set: u }, { new: true }, (err, doc) => {
                if (!err) { res.status(200).send(doc); }
                else {
                    res.status(400).send(console.log("erreur de mise a jour" + err));
                }
            });
        }

    });
});



app.get("/getAllUser", (req, res) => {

    User.find({ statut: 'user' }).then((user) => {
       
        res.status(200).send(user );


    }).catch((err) => {
        res.status(400).send({
            message: "erreur : " + err
        });


    })

})

app.get("/getAllAdmin", (req, res) => {

    User.find({ statut: 'admin' }).then((user) => {
        let nbAdmin = 0;
        user.forEach(element => {
            nbAdmin = nbAdmin + 1;
        });
        res.status(200).send({ nbAdmin });


    }).catch((err) => {
        res.status(400).send({
            message: "erreur : " + err
        });


    })

});

app.get("/getAllSuperAdmin", (req, res) => {

    User.find({ statut: 'superAdmin' }).then((user) => {
        let nbSuperAdmin = 0;
        user.forEach(element => {
            nbSuperAdmin = nbSuperAdmin + 1;
        });
        res.status(200).send({ nbSuperAdmin });


    }).catch((err) => {
        res.status(400).send({
            message: "erreur : " + err
        });


    })

})





module.exports = app;