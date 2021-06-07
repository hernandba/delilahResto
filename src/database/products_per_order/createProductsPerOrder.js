const sequelize = require('../connection');

async function createProductsPerOrder(id_order_req, products_req){
    try {
        //Declaro la query del INSERT por aparte con el nombre de la tabla y los valores correspondientes
        //Y por aparte voy agregando los "pedazos" con los valores que necesito ingresar
        let query = "INSERT INTO products_per_order (id_order, id_product, product_quantity) VALUES ";
        for (let i = 0; i < products_req.length; i++) {
            if(i == (products_req.length - 1)){
                query+= `(${id_order_req}, (SELECT id_product FROM products WHERE ref ='${products_req[i].ref}'), ${products_req[i].product_quantity})`
            }else{
                query+= `(${id_order_req}, (SELECT id_product FROM products WHERE ref ='${products_req[i].ref}'), ${products_req[i].product_quantity}),`
            }
        }

        //Despues paso la variable query(string) como la query que se va a mandar a sequelize
        let result = await sequelize.query(
            query,
            {
                type: sequelize.QueryTypes.INSERT
            }
        )

        //INSERT retorna un arreglo con los id's de los registros creados
        return result;
    } catch (error) {
        console.error('Error createProductsPerOrder: \n', error)
    }
}

module.exports = createProductsPerOrder;