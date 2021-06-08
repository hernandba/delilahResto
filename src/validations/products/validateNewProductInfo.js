const searchProduct = require('../../database/products/searchProduct');

const validateNewProductInfo = (req, res, next) => {
    const {name, ref, price} = req.body;

    if(!name || !ref || !price){
        return res.status(400).send({
            status: 'error',
            message: 'Uncomplete Data'
        })
    }

    if(typeof(price) != 'number'){
        return res.status(400).send({
            status: 'error',
            message: 'Invalid Price'
        })
    }

    searchProduct(name, ref).then(result => {
        const productExists = result;
        console.log(productExists);

        if (productExists) {
            return res.status(400).send({
                status: 'error',
                message: 'Product already exists',
                data: result
            });
        }

        return next();
    })
}

module.exports = validateNewProductInfo;