/* -------------------------------------------------------------------------- */
/*                               ROUTE /products                              */
/* -------------------------------------------------------------------------- */
const express = require('express');
const router = express.Router();

const getAllproducts = require('../database/products/getAllProducts')

const validateNewProductInfo = require('../validations/products/validateNewProductInfo');
const createProduct = require('../database/products/createProduct');
const validateProductId = require('../validations/products/validateProductId');
const getProductById = require('../database/products/getProductById');
const updateProduct = require('../database/products/updateProduct');
const deleteProduct = require('../database/products/deleteProduct');

const authAdmin = require('../auth/authAdmin');

router.route('')
    .get((req,res) => {
        //ALL
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
    .post(authAdmin, validateNewProductInfo, (req,res) => {
        //ADMIN
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

router.route('/:id_product')
    .get(validateProductId, (req, res) => {
        //ALL
        //Obtiene la informacion de un producto con su id
        const {id_product} = req.params;
        getProductById(id_product).then(result => {
            res.status(200).send({
                status: 'OK',
                message: 'Product Info',
                data: result
            })
        })
    })
    .put(authAdmin, validateProductId, validateNewProductInfo, (req, res) => {
        //ADMIN
        //Actualiza la informacion de un producto
        const {id_product} = req.params;
        const {name, ref, price} = req.body;
        const new_product_data = [`name = '${name}'`, `ref = '${ref}'`, `price = '${price}'`]
        updateProduct(id_product, new_product_data).then(result => {
            getProductById(id_product).then(product_info => {
                res.status(200).send({
                    status: 'OK',
                    message: 'Product Info Updated',
                    data: {
                        id_product: id_product,
                        product_info: product_info
                    }
                })
            })
        })
    })
    .delete(authAdmin, validateProductId, (req, res) => {
        //ADMIN
        //Elimina un producto
        const {id_product} = req.params;
        deleteProduct(id_product).then(result => {
            res.status(200).send({
                status: 'OK',
                message: 'Product Deleted',
                data: {
                    id_product: id_product,
                    data: result
                }
            })
        })
    })

module.exports = router;