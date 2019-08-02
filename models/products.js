const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator');


const ProductSchema = new mongoose.Schema(
    {

        productName:
        {
            require: true,
            type: String


        },

        productDisc:
        {
            require: true,
            type: String

        },

        productPrice:
        {
            require: true,
            type: String

        },

        productQuantity:
        {
            require: true,
            type: String

        },
        productPic:
        {
            require: true,
            type: String


        },
        productPic:
        {
            require: true,
            type: String


        },

        producCategory:
        {
            require: true,
            type: String
        },

        producColor:
        {
            require: true,
            type: String
        },

        idSeller:
        {
            require: true,
            type: String

        }




    });


let Product = mongoose.model('Product', ProductSchema);
module.exports = { Product };
