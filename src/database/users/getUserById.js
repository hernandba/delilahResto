const sequelize = require('../connection');

//Credential data: {username: "username", email:"email"}
async function getUserById(id_user_req){
    try {
        let result = await sequelize.query(
            'SELECT id_user, username, fullname, email, phone, address FROM users WHERE id_user = :id_user',
            {
                replacements: {id_user: id_user_req},
                type: sequelize.QueryTypes.SELECT
            }
        )
        //El resultado de SELECT es un arreglo
        return result;
    } catch (error) {
        console.error('Error getUserById: \n', error)
    }
}

module.exports = getUserById;