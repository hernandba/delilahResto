/* -------------------------------------------------------------------------- */
/*                                ROUTE /users                                */
/* -------------------------------------------------------------------------- */
const express = require('express')
const router = express.Router();

const validateNewUser = require('../validations/users/validateNewUser')
const createUser = require('../database/users/createUser');

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
    })

    module.exports = router;