const getRefProduct = require("../../database/products/getRefProduct");

const validateNewOrderInfo = (req, res, next) => {
    const {id_user, payment, products} = req.body;
    const refsProducts = ['BagSal', 'HamClas', 'HamSpe', 'SanVeg', 'SanVeg', 'Veggie', 'Focaccia', 'SanFoc', 'VegAvo']

    if(!id_user || !payment){
        return res.status(400).send({
            status: 'error',
            message: 'Uncomplete Data'
        })
    }

    if(products.length == 0){
        return res.status(400).send({
            status: 'error',
            message: 'No Products to Order'
        })
    }

    let missingProductsInfo = [];
    let wrongProductsRef = [];
    products.forEach(product => {
        if(!product.ref || !product.product_quantity){
            missingProductsInfo.push(product);
        }else{
            if(refsProducts.indexOf(product.ref) < 0){
                wrongProductsRef.push(product)
            }
        }
    });

    if(missingProductsInfo.length > 0){
        return res.status(400).send({
            status: 'error',
            message: 'Missing Info Product(s)',
            data: missingProductsInfo
        })
    }

    if(wrongProductsRef.length > 0){
        return res.status(400).send({
            status: 'error',
            message: 'Wrong Ref Product(s)',
            data: wrongProductsRef
        })
    }

    //TODO: Validar que la referencia existe para cada producto

    return next();
}

module.exports = validateNewOrderInfo;