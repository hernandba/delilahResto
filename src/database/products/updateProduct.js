const sequelize = require('../connection');

async function updateProduct(id_product_req, new_product_data_req){
    try {
        let query = 'UPDATE products SET ';
        for (let i = 0; i < new_product_data_req.length; i++) {
            if(i == (new_product_data_req.length - 1)){
                query+= `${new_product_data_req[i]} WHERE id_product = :id_product`;
            }else{
                query+= `${new_product_data_req[i]}, `;
            }
        }

        let result = await sequelize.query(
            query,
            {
                replacements: {id_product: id_product_req, new_product_data: new_product_data_req},
                type: sequelize.QueryTypes.INSERT
            }
        )
        //INSERT retorna un arreglo con los id's de los registros creados
        return result;
    } catch (error) {
        console.error('Error updateProduct: \n', error)
    }
}

module.exports = updateProduct;