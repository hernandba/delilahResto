const sequelize = require('../connection');

async function getRefProduct(ref_req){
    try {
        let result = await sequelize.query(
            'SELECT * FROM products WHERE ref = :ref',
            {
                replacements: {ref: ref_req},
                type: sequelize.QueryTypes.SELECT
            }
        )
        //El resultado de SELECT es un arreglo
        //Se retorna el primer elemento
        return result[0];
    } catch (error) {
        console.error('Error getRefProduct: \n', error)
    }
}

module.exports = getRefProduct;