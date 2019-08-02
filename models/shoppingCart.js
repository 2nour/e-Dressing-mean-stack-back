const mongooose = require('mongoose');
const validator = require('validator');
const { Product } = require('./../models/products')

const shoppingCartSchema = new mongooose.Schema({


    products:
        [
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
        
                producColor:
                {
                    require: true,
                    type: String
                },
        
                idClientOwner:
                {
                    require: true,
                    type: String
        
                }
        
        

            }

        ]
    ,
    quantity:
    {
        require: true,
        type: Number,
        default :0
    },
    idClient:
    {
        require: true,
        type: String
    }




})

ShoppingCart = mongooose.model('ShoppingCart', shoppingCartSchema);
module.exports = { ShoppingCart };