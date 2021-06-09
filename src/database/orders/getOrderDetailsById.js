const sequelize = require('../connection');

//id_user_req: {id_user_req: "id_user"}
async function getOrderDetailsById(id_order){
    try {
        const products_detail = await sequelize.query(
            "SELECT products.name, products.ref, products.price, products_per_order.product_quantity FROM products_per_order JOIN products ON products_per_order.id_product = products.id_product WHERE products_per_order.id_order = :id_order",
            {   
                replacements: {id_order: id_order},
                type: sequelize.QueryTypes.SELECT
            }
        )

        const order_detail = await sequelize.query(
            "SELECT orders.id_order, SUM(products.price*products_per_order.product_quantity) total, situation.situation, payment.method, users.fullname, users.username, users.email, users.phone, users.address FROM orders JOIN situation ON orders.id_situation = situation.id_situation JOIN payment ON orders.id_payment = payment.id_payment JOIN users ON orders.id_user = users.id_user JOIN products_per_order ON orders.id_order = products_per_order.id_order JOIN products ON products_per_order.id_product = products.id_product WHERE orders.id_order = :id_order",
            {   
                replacements: {id_order: id_order},
                type: sequelize.QueryTypes.SELECT
            }
        )

        const result = {order_detail:order_detail, products_detail: products_detail}
       
        //Retorna Arreglo con todos los favs    
        return result;
    } catch (error) {
        console.error('Error getOrderDetailsById: \n', error)
    }
}

module.exports = getOrderDetailsById;