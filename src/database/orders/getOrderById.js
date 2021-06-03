const sequelize = require('../connection');

async function getOrderById(id_order_req){
    try {
        let result = await sequelize.query(
            'SELECT * FROM orders WHERE id_order = :id_order',
            {
                replacements: {id_order: id_order_req},
                type: sequelize.QueryTypes.SELECT
            }
        )
        //El resultado de SELECT es un arreglo
        //Se retorna el primer elemento
        return result[0];
    } catch (error) {
        console.error('Error getOrderById: \n', error)
    }
}

module.exports = getOrderById;