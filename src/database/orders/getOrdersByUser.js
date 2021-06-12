const sequelize = require('../connection');

//id_user_req: {id_user_req: "id_user"}
async function getOrdersByUser(id_user_req){
    try {
        let result = await sequelize.query(
            "SELECT situation.situation, orders.date, orders.id_order, GROUP_CONCAT(CONCAT(products_per_order.product_quantity,'x',products.ref) SEPARATOR ' ') description, payment.method, SUM(products.price*products_per_order.product_quantity) total FROM orders JOIN situation ON orders.id_situation = situation.id_situation JOIN payment ON orders.id_payment = payment.id_payment JOIN users ON orders.id_user = users.id_user JOIN products_per_order ON orders.id_order = products_per_order.id_order JOIN products ON products_per_order.id_product = products.id_product WHERE orders.id_user = :id_user GROUP BY orders.id_order",
            {
                replacements: {id_user: id_user_req},
                type: sequelize.QueryTypes.SELECT
            }
        )
        //Retorna Arreglo con todos los favs    
        return result;
    } catch (error) {
        console.error('Error getOrdersByUser: \n', error)
    }
}

module.exports = getOrdersByUser;