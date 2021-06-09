const sequelize = require('../connection');

//Credential data: {username: "username", email:"email"}
async function getAllUsers(filter_req){
    try {
        let query;

        if(!filter_req){
            query = 'SELECT id_user, username, fullname, email, phone, address, admin FROM users'
        }else{
            query = 'SELECT id_user, username, fullname, email, phone, address, admin FROM users WHERE admin = :admin'
        }

        let result = await sequelize.query(
            query,
            {
                replacements: {admin: filter_req},
                type: sequelize.QueryTypes.SELECT
            }
        )
        //El resultado de SELECT es un arreglo
        return result;
    } catch (error) {
        console.error('Error getAllUsers: \n', error)
    }
}

module.exports = getAllUsers;