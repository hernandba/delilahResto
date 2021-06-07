const sequelize = require('../connection');

async function createOrder(id_user_req, payment_req){
    try {
        let result = await sequelize.query(
            "INSERT INTO orders VALUES (NULL, :id_user, 1, TIME_FORMAT(CURTIME(), '%h:%i %p'), (SELECT id_payment FROM payment WHERE method = :payment))",
            {
                replacements: {id_user: id_user_req, payment:payment_req},
                type: sequelize.QueryTypes.INSERT
            }
        )        
        //INSERT retorna un arreglo con los id's de los registros creados
        return result[0];
    } catch (error) {
        console.error('Error createOrder: \n', error)
    }
}

module.exports = createOrder;