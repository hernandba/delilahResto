const sequelize = require('../connection');

//id_user_req: {id_user_req: "id_user"}
async function getFavsUser(id_user_req){
    try {
        let result = await sequelize.query(
            'SELECT p.id_product, p.ref, p.name, p.price FROM users_favs JOIN products p ON users_favs.id_product = p.id_product WHERE id_user = :id_user',
            {
                replacements: { id_user: id_user_req },
                type: sequelize.QueryTypes.SELECT
            }
        )
        //Retorna Arreglo con todos los favs    
        return result;
    } catch (error) {
        console.error('Error getFavsUser: \n', error)
    }
}

module.exports = getFavsUser;