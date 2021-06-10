/* -------------------------------------------------------------------------- */
/*                                ROUTE /users                                */
/* -------------------------------------------------------------------------- */
const express = require('express')
const router = express.Router();

const validateNewUser = require('../validations/users/validateNewUser')
const validateUserId = require('../validations/users/validateUserId')
const createUser = require('../database/users/createUser');

const getAllUsers = require('../database/users/getAllUsers');
const getFavsUser = require('../database/users/getFavsUser');
const getUserById = require('../database/users/getUserById');
const validateUpdateUserInfo = require('../validations/users/validateUpdateUserInfo');
const updateUser = require('../database/users/updateUser');

router.route('')
    .get((req, res) => {
        //ADMIN
        //Obtener informacion de todos los usuarios
        const {admin} = req.query;
        getAllUsers(admin).then(result => {
            res.status(200).send(
                {
                    status: 'OK',
                    message: 'All Users Info',
                    data: result
                }
            )
        })
    })
    .post(validateNewUser, (req, res) => {
        //ALL
        //Registrar nuevo usuario
        const {username, fullname, email, phone, address} = req.body;

        createUser(req.body).then(result => {
            res.status(200).send(
                {
                    status: 'OK',
                    message: 'New User Created',
                    data:{
                        id_user: result,
                        username: username,
                        fullname: fullname,
                        email: email,
                        phone: phone,
                        address: address
                    }
                }
            )
        })
    });

router.route('/:id_user')
    .get(validateUserId, (req,res) => {
        //ALL
        //Obtener informacion de un usuario
        const {id_user} = req.params
        getUserById(id_user).then(user_info => {
            getFavsUser(id_user).then(user_favs => {
                res.status(200).send(
                    {
                        status: "OK",
                        message: "User Info",
                        data: {
                            id_user: id_user,
                            user_info: user_info[0],
                            user_favs: user_favs
                        }
                    }
                )
            })
        })
    })
    .put(validateUserId, validateUpdateUserInfo, (req,res) => {
        //ALL
        //Modificar informacion de un usuario
        const {id_user} = req.params
        // let {username, fullname, email, phone, address, password} = req.body;
        //Convierto el objeto req.body en un arreglo de pares [key,value]
        const new_user_data = Object.entries(req.body);
        
        updateUser(id_user, new_user_data).then(result => {
            getUserById(id_user).then(user_info => {
                res.status(200).send(
                    {
                        status: 'OK',
                        message: 'User Info Updated',
                        data: user_info
                    }
                )
            })
        })
    })


module.exports = router;