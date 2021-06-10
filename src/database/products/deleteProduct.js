const sequelize = require('../connection');

async function deleteProduct(id_product_req){
    try {
        let result = await sequelize.query(
            'DELETE FROM products WHERE id_product = :id_product',
            {
                replacements: {id_product: id_product_req},
                type: sequelize.QueryTypes.DELETE
            }
        )
        //INSERT retorna un arreglo con los id's de los registros creados
        return result;
    } catch (error) {
        console.error('Error deleteProduct: \n', error)
    }
}

module.exports = deleteProduct;