const { filter } = require('compression');
const sequelize = require('../connection');

async function updateUser(id_user_req, updateData_req){
    try {
        let query = 'UPDATE users SET '
        //1.Creo un arreglo vacio donde voy a guardar los datos correspondientes
        const filteredData = []
        
        //2. Recorro el arreglo de datos y guardo en filteredData solamente los datos que tengan valor distino a '' (vacio)
        updateData_req.forEach(([key, value]) => {
            if(value){
                filteredData.push(`${key} = '${value}'`)
            }
        })

        //3. Recorro el arreglo filtrado para ingresar los valores a actualizar en la query
        for (let i = 0; i < filteredData.length; i++) {
            if(i == (filteredData.length - 1)){
                query+= `${filteredData[i]} WHERE id_user = :id_user`
            }else{
                query+= `${filteredData[i]}, `
            }
        }

        //'UPDATE users SET :data WHERE id_user = :id_user'
        let result = await sequelize.query(
            query,
            {
                replacements: {data: filteredData, id_user: id_user_req},
                type: sequelize.QueryTypes.UPDATE
            }
        )
        //El resultado de SELECT es un arreglo
        //Se retorna el primer elemento
        return result;
    } catch (error) {
        console.error('Error updateUser: \n', error)
    }
}

module.exports = updateUser;