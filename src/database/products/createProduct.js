const sequelize = require('../connection');

async function createProduct(newProductData){
    try {
        let result = await sequelize.query(
            'INSERT INTO products VALUES (NULL, :name, :ref, :price)',
            {
                replacements: newProductData,
                type: sequelize.QueryTypes.INSERT
            }
        )
        //INSERT retorna un arreglo con los id's de los registros creados
        return result[0];
    } catch (error) {
        console.error('Error createProduct: \n', error)
    }
}

module.exports = createProduct;