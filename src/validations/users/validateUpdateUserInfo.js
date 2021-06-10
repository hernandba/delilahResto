const searchUser = require('../../database/users/searchUser');

const validateUpdateUserInfo = (req, res, next) => {
    let {username, email} = req.body;
    const {id_user} = req.params;

    //Si no ingreso datos para actualizar
    if(Object.entries(req.body).length <= 0){
        return res.status(400).send({
            status: 'error',
            message: 'No data to update in user'
        });
    }

    //Si hay informacion en alguno de los dos datos
    if(username || email){
        //1. Sobrescribo la info que traigan: Si tenia informacion -> queda igual, SINO (era undefined) le asigno "" (espacio vacio)
        //*Esto porque no puedo entregar 'undefined' como parametro de busqueda en la query
        username = typeof(username) !== 'undefined' ? username : "";
        email = typeof(email) !== 'undefined' ? email : "";
        //2. Realizo la busqueda con los dos parametros para ver si hay un usuario con esa misma informacion
        searchUser({username: username, email: email, id_user:""}).then(result => {
            const userExists = result;
            console.log(userExists);
    
            if (userExists) {
                return res.status(400).send({
                    status: 'error',
                    message: 'User already exists'
                });
            }
    
            return next();
        })
    }else{
        //Si no hay informacion en ninguno de los dos, sigo
        return next();
    }
}

module.exports = validateUpdateUserInfo;