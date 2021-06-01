/* -------------------------------------------------------------------------- */
/*                                ROUTE /orders                               */
/* -------------------------------------------------------------------------- */
const express = require('express')
const router = express.Router();

const getAllOrders = require('../database/orders/getAllOrders')

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
    .get((req, res) => {
        //TODO: Validacion de rol (token -> user||admin) para poder hacer peticion -> ADMIN && USER
        //Obtener informacion de un pedido por id_pedido
    })
    .put((req, res) => {
        //TODO: Validacion de rol (token -> user||admin) para poder hacer peticion -> ONLY ADMIN
        //Actualizar estado de un pedido por id_pedido
    })

module.exports = router;