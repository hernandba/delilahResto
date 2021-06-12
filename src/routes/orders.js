/* -------------------------------------------------------------------------- */
/*                                ROUTE /orders                               */
/* -------------------------------------------------------------------------- */
require('dotenv').config();
const ADMINKEY = process.env.ADMINKEY;
const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router();

const getAllOrders = require('../database/orders/getAllOrders')
const getOrderDetailsById = require('../database/orders/getOrderDetailsById')
const updateOrderSituationById = require('../database/orders/updateOrderSituationById')
const getOrderSituationById = require('../database/orders/getOrderSituationById')
const createOrder = require('../database/orders/createOrder')

const createProductsPerOrder = require('../database/products_per_order/createProductsPerOrder')

const validateSituationForOrder = require('../validations/orders/validateSituationForOrder');
const validateOrderId = require('../validations/orders/validateOrderId');
const validateNewOrderInfo = require('../validations/orders/validateNewOrderInfo');

const authAdmin = require('../auth/authAdmin');
const getOrdersByUser = require('../database/orders/getOrdersByUser');

// orders/all
router.route('/all').get(authAdmin, (req, res) => {
        //ADMIN
        //Mostrar todos los pedidos
        getAllOrders().then(result => {
            res.status(200).send(
                {
                    status: "OK",
                    message: "All Orders",
                    data: result
                }
            )
        })
    })

// orders/:id_order
router.route('/:id_order')
    .get(authAdmin, validateOrderId, (req, res) => {
        //ADMIN
        //Obtener informacion de un pedido por id_pedido
        const {id_order} = req.params;

        getOrderDetailsById(id_order).then(result => {
            const {order_detail, products_detail} = result;
            res.status(200).send(
                {
                    status: "OK",
                    message: "Order Details",
                    data: {
                        id_order: id_order,
                        products_detail: products_detail,
                        order_detail: order_detail
                    }
                }
            )
        })
    })
    .put(authAdmin, validateSituationForOrder, (req, res) => {
        //ADMIN
        //Actualizar estado de un pedido por id_pedido
        const {id_order} = req.params;
        const {situation} = req.body;

        updateOrderSituationById(id_order,situation).then(result => {
            getOrderDetailsById(id_order).then(newResult => {
                res.status(200).send(
                    {
                        status: "OK",
                        message: "Order Situation Updated",
                        data: newResult
                    }
                )
            })
        })
    })
    .delete(authAdmin, (req,res) => {
        //ADMIN
        //Actualizar estado de un pedido a CANCELADO por id_pedido
        const {id_order} = req.params;

        updateOrderSituationById(id_order,'cancelado').then(result => {
            getOrderDetailsById(id_order).then(newResult => {
                res.status(200).send(
                    {
                        status: "OK",
                        message: "Order Canceled",
                        data: newResult
                    }
                )
            })
        })
    })

// /orders
router.route('')
    .get((req, res) => {
        //ALL
        //Obtener informacion de un pedido por id_pedido
        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
        const tokenDecoded = jwt.verify(token, ADMINKEY);

        getOrdersByUser(tokenDecoded.id_user).then(result => {
            res.status(200).send(
                {
                    status: "OK",
                    message: "Orders By User",
                    data: {
                        id_user: tokenDecoded.id_user,
                        orders: result
                    }
                }
            )
        })
    })
    .post(validateNewOrderInfo, (req, res) => {
        //ALL
        //Crear un nuevo pedido del usuario que inicio sesion
        const {payment, products} = req.body;

        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
        const tokenDecoded = jwt.verify(token, ADMINKEY);

        createOrder(tokenDecoded.id_user, payment).then(result => {
            const id_newOrder = result;

            createProductsPerOrder(id_newOrder,products).then( () => {

                getOrderDetailsById(id_newOrder).then(r => {

                    const {order_detail, products_detail} = r;
                    res.status(200).send(
                        {
                            status: "OK",
                            message: "New Order Created",
                            data: {
                                id_user: tokenDecoded.id_user,
                                id_order: id_newOrder,
                                products_detail: products_detail,
                                order_detail: order_detail
                            }
                        }
                    )
                })
            })
        })
    })

module.exports = router;