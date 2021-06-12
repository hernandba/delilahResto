/* -------------------------------------------------------------------------- */
/*                                ROUTE /users                                */
/* -------------------------------------------------------------------------- */
require('dotenv').config();
const ADMINKEY = process.env.ADMINKEY;
const jwt = require('jsonwebtoken');
const express = require('express')
const router = express.Router();

const validateNewUser = require('../validations/users/validateNewUser')
const validateUserId = require('../validations/users/validateUserId')
const validateUpdateUserInfo = require('../validations/users/validateUpdateUserInfo');

const createUser = require('../database/users/createUser');
const getAllUsers = require('../database/users/getAllUsers');
const getFavsUser = require('../database/users/getFavsUser');
const getUserById = require('../database/users/getUserById');
const updateUser = require('../database/users/updateUser');

const authAdmin = require('../auth/authAdmin');

// /users/register
router.route('/register').post(validateNewUser, (req, res) => {
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

// /users/all
router.route('/all').get(authAdmin, (req, res) => {
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

router.route('/:id_user')
    .get(authAdmin, validateUserId, (req,res) => {
        //ADMIN
        //Obtener informacion de un usuario por id
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
    .put(authAdmin, validateUserId, validateUpdateUserInfo, (req,res) => {
        //ALL
        //Modificar informacion de un usuario por id
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

// /users
router.route('')
    .get((req, res) => {
        //ALL
        //Obtener informacion del usuario que inicio sesion
        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
        const tokenDecoded = jwt.verify(token, ADMINKEY);

        getUserById(tokenDecoded.id_user).then(user_info => {
            getFavsUser(tokenDecoded.id_user).then(user_favs => {
                res.status(200).send(
                    {
                        status: "OK",
                        message: "User Info",
                        data: {
                            id_user: tokenDecoded.id_user,
                            user_info: user_info[0],
                            user_favs: user_favs
                        }
                    }
                )
            })
        })
    })
    .put(validateUpdateUserInfo, (req,res) => {
        //ALL
        //Modificar informacion del usuario que inicio sesion
        const { authorization } = req.headers;
        const token = authorization.split(" ")[1];
        const tokenDecoded = jwt.verify(token, ADMINKEY);
        // let {username, fullname, email, phone, address, password} = req.body;
        //Convierto el objeto req.body en un arreglo de pares [key,value]
        const new_user_data = Object.entries(req.body);
        
        updateUser(tokenDecoded.id_user, new_user_data).then(result => {
            getUserById(tokenDecoded.id_user).then(user_info => {
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