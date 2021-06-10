const searchUser = require('../../database/users/searchUser');

const validateUpdateUserInfo = (req, res, next) => {
    let {username, fullname, email, phone, address, password} = req.body;
    const validFields = ['username', 'fullname', 'email', 'phone', 'address', 'password'];
    const invalidFields = []
    const reqFields = Object.entries(req.body);
    const {id_user} = req.params;

    //Si no ingreso datos o mas de los permitidos (6) para actualizar
    if(reqFields.length <= 0 || reqFields.length > 6){
        return res.status(400).send({
            status: 'error',
            message: 'Invalid quantity of fields to update'
        });
    }else{
        //Ingresa la cantidad de datos en el rango (1 a 6)
        //Validacion de que los datos ingresados son validos
        //1.Busca cada uno de los datosReq en los datosValidos
        reqFields.forEach(([key, value]) => {
            if(validFields.indexOf(key) < 0){
                //2.Si no lo encuentra (no es valido) lo ingresa a camposInvalidos
                invalidFields.push(key)   
            }
        })
        // console.log('invalid fields : ', invalidFields)

        //3.Si hay informacion en datosInvalidos, la envia como respuesta
        if(invalidFields.length > 0){
            return res.status(400).send({
                status: 'error',
                message: 'Invalid fields to update',
                data: invalidFields
            })
        }
    } 

    //Si hay informacion para cambiar en username o email
    if(username || email){
        //1. Sobrescribo la info que traigan: Si tenia informacion -> queda igual, SINO (era undefined) le asigno "" (espacio vacio)
        //*Esto porque no puedo entregar 'undefined' como parametro de busqueda en la query
        username = typeof(username) !== 'undefined' ? username : "";
        email = typeof(email) !== 'undefined' ? email : "";
        //2. Realizo la busqueda con los dos parametros para ver si hay un usuario con esa misma informacion
        searchUser({username: username, email: email, id_user:""}).then(result => {
            const userExists = result;
            // console.log(userExists);
            //3.Si existe un usuario con esa misma informacion, responde con un error
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