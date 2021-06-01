/* -------------------------------------------------------------------------- */
/*                                ROUTE /users                                */
/* -------------------------------------------------------------------------- */
const express = require('express')
const router = express.Router();

const validateNewUser = require('../validations/users/validateNewUser')
const validateUserId = require('../validations/users/validateUserId')
const createUser = require('../database/users/createUser');
const getFavsUser = require('../database/users/getFavsUser');

router.route('')
    .post(validateNewUser, (req, res) => {
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

router.route('/:id_user/favs')
    .get(validateUserId, (req,res) => {
        //TODO: Validacion de rol (token -> user||admin) para poder hacer peticion -> ADMIN && USER
        const {id_user} = req.params;

        getFavsUser(id_user).then(result => {
            res.status(200).send(
                {
                    status: "OK",
                    message: "Favs by id_user",
                    data: {
                        id_user: id_user,
                        favs: result
                    }
                }
            )
        })  
    })


module.exports = router;