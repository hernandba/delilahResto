const sequelize = require('../connection');

async function createUser(newUserData){
    try {
        let result = await sequelize.query(
            'INSERT INTO users VALUES (NULL, :username, :fullname, :email, :phone, :address, :password, false)',
            {
                replacements: newUserData,
                type: sequelize.QueryTypes.INSERT
            }
        )
        //INSERT retorna un arreglo con los id's de los registros creados
        return result[0];
    } catch (error) {
        console.error('Error createUser: \n', error)
    }
}

module.exports = createUser;