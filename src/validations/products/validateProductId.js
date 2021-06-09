const getProductById = require('../../database/products/getProductById');

const validateProductId = (req, res, next) => {
    const {id_product} = req.params

    getProductById(id_product).then(result => {
        const productExists = result;
        console.log(productExists);

        if (!productExists) {
            return res.status(400).send({
                status: 'error',
                message: 'No Product with Specified Id',
                id_product: id_product
            });
        }

        return next();
    })
}

module.exports = validateProductId;