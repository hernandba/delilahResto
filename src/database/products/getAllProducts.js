const sequelize = require('../connection');

//id_user_req: {id_user_req: "id_user"}
async function getAllproducts(){
    try {
        let result = await sequelize.query(
            "SELECT * FROM products",
            {
                type: sequelize.QueryTypes.SELECT
            }
        )
        //Retorna Arreglo con todos los favs    
        return result;
    } catch (error) {
        console.error('Error getAllproducts: \n', error)
    }
}

module.exports = getAllproducts;