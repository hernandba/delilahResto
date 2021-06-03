const getOrderById = require('../../database/orders/getOrderById');

const validateOrderId = (req, res, next) => {
    const {id_order} = req.params;

    if(!id_order){
        return res.status(400).send({
            status: 'error',
            message: 'Uncomplete Data'
        })
    }

    getOrderById(id_order).then(result => {
        const orderExists = result;
        console.log(orderExists);

        if (!orderExists) {
            return res.status(404).send({
                status: 'error',
                message: 'Order not found'
            });
        }

        return next();
    })
}

module.exports = validateOrderId;