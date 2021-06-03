/* -------------------------------------------------------------------------- */
/*                                ROUTE /orders                               */
/* -------------------------------------------------------------------------- */
const express = require('express')
const router = express.Router();

const getAllOrders = require('../database/orders/getAllOrders')
const getOrderDetailsById = require('../database/orders/getOrderDetailsById')
const updateOrderSituationById = require('../database/orders/updateOrderSituationById')
const getOrderSituationById = require('../database/orders/getOrderSituationById')

const validateOrderId = require('../validations/orders/validateOrderId');
const validateSituationForOrder = require('../validations/orders/validateSituationForOrder');

router.route('')
    .get((req, res) => {
        //TODO: Validacion de rol (token -> user||admin) para poder hacer peticion -> ONLY ADMIN
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
    .post((req, res) => {
        //TODO: Validacion de rol (token -> user||admin) para poder hacer peticion -> ADMIN && USER
        //Crear un nuevo pedido
    })

router.route('/:id_order')
    .get(validateOrderId, (req, res) => {
        //TODO: Validacion de rol (token -> user||admin) para poder hacer peticion -> ADMIN && USER
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
    .put(validateSituationForOrder, (req, res) => {
        //TODO: Validacion de rol (token -> user||admin) para poder hacer peticion -> ONLY ADMIN
        //Actualizar estado de un pedido por id_pedido
        const {id_order} = req.params;
        const {situation} = req.body;

        updateOrderSituationById(id_order,situation).then(result => {
            getOrderSituationById(id_order).then(newResult => {
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

module.exports = router;