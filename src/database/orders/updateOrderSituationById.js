const sequelize = require('../connection');

async function updateOrderSituationById(id_order_req, new_situation){
    try {
        let result = await sequelize.query(
            "UPDATE orders SET id_situation = (SELECT id_situation FROM situation WHERE situation = :situation) WHERE id_order = :id_order",
            {
                replacements: {id_order: id_order_req, situation: new_situation},
                type: sequelize.QueryTypes.UPDATE
            }
        )
        //El resultado de SELECT es un arreglo
        //Se retorna el primer elemento
        console.log(result)
        return result;
    } catch (error) {
        console.error('Error updateOrderSituationById: \n', error)
    }
}

module.exports = updateOrderSituationById;