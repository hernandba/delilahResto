/* -------------------------------------------------------------------------- */
/*                               ROUTE /products                              */
/* -------------------------------------------------------------------------- */
const express = require('express');
const router = express.Router();

const getAllproducts = require('../database/products/getAllProducts')

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
    .post((req,res) => {
        //TODO: Validacion de rol (token -> user||admin) para poder hacer peticion -> ONLY ADMIN
        //Crear un nuevo producto
        const {product_name, product_ref, product_price} = req.body;
        
    })

module.exports = router;