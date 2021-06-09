const sequelize = require('../connection');

async function getProductById(id_product_req){
    try {
        let result = await sequelize.query(
            'SELECT * FROM products WHERE id_product= :id_product',
            {
                replacements: {id_product: id_product_req},
                type: sequelize.QueryTypes.SELECT
            }
        )
        //El resultado de SELECT es un arreglo
        //Se retorna el primer elemento
        return result[0];
    } catch (error) {
        console.error('Error getProductById: \n', error)
    }
}

module.exports = getProductById;