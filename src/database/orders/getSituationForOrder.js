const sequelize = require('../connection');

async function getSituationForOrder(situation_req){
    try {
        let result = await sequelize.query(
            'SELECT * FROM situation WHERE situation = :situation',
            {
                replacements: {situation: situation_req},
                type: sequelize.QueryTypes.SELECT
            }
        )
        //El resultado de SELECT es un arreglo
        //Se retorna el primer elemento
        return result[0];
    } catch (error) {
        console.error('Error getSituationForOrder: \n', error)
    }
}

module.exports = getSituationForOrder;