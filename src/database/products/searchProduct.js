const sequelize = require('../connection');

async function searchProduct(product_name_req, product_ref_req){
    try {
        let result = await sequelize.query(
            'SELECT * FROM products WHERE name = :name OR ref = :ref',
            {
                replacements: {name: product_name_req, ref: product_ref_req},
                type: sequelize.QueryTypes.SELECT
            }
        )
        //El resultado de SELECT es un arreglo
        //Se retorna el primer elemento
        return result[0];
    } catch (error) {
        console.error('Error searchProduct: \n', error)
    }
}

module.exports = searchProduct;