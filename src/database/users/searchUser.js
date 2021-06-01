const sequelize = require('../connection');

//Credential data: {username: "username", email:"email"}
async function searchUser(credentialData){
    try {
        let result = await sequelize.query(
            'SELECT id_user, username, email, password, admin FROM users WHERE username = :username OR email = :email OR id_user = :id_user',
            {
                replacements: credentialData,
                type: sequelize.QueryTypes.SELECT
            }
        )
        //El resultado de SELECT es un arreglo
        //Se retorna el primer elemento
        return result[0];
    } catch (error) {
        console.error('Error searchUser: \n', error)
    }
}

module.exports = searchUser;