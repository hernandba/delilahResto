/* -------------------------------------------------------------------------- */
/*                               ROUTE /products                              */
/* -------------------------------------------------------------------------- */
const express = require('express');
const router = express.Router();

const getAllproducts = require('../database/products/getAllProducts')

const validateNewProductInfo = require('../validations/products/validateNewProductInfo');
const createProduct = require('../database/products/createProduct')

router.route('')
    .get((req,res) => {
        //TODO: Validacion de rol (token -> user||admin) para poder hacer peticion -> ADMIN && USER
        //Mostrar todos los productos
        getAllproducts().then(result => {
            res.status(200).send(
                {
                    status: 'OK',
                    message: 'All Products',
                    data: result
                }
            )
        })
    })
    .post(validateNewProductInfo, (req,res) => {
        //TODO: Validacion de rol (token -> user||admin) para poder hacer peticion -> ONLY ADMIN
        //Crear un nuevo producto
        const {name, ref, price} = req.body;

        createProduct(req.body).then(result => {
            res.status(200).send(
                {
                    status: 'OK',
                    message: 'New Product Created',
                    data:{
                        id_product: result,
                        name: name,
                        ref: ref,
                        price: price
                    }
                }
            )
        })
    })

module.exports = router;