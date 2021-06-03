const sequelize = require('../connection');

async function getOrderSituationById(id_order_req){
    try {
        let result = await sequelize.query(
            'SELECT orders.id_order, situation.situation FROM orders JOIN situation ON orders.id_situation = situation.id_situation WHERE id_order = :id_order',
            {
                replacements: {id_order: id_order_req},
                type: sequelize.QueryTypes.SELECT
            }
        )
        //El resultado de SELECT es un arreglo
        //Se retorna el primer elemento
        return result[0];
    } catch (error) {
        console.error('Error getOrderSituationById: \n', error)
    }
}

module.exports = getOrderSituationById;