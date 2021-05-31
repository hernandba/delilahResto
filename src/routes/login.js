/* -------------------------------------------------------------------------- */
/*                                ROUTE /login                                */
/* -------------------------------------------------------------------------- */
const express = require('express')
const router = express.Router();

const validateLogin = require('../validations/login/validateLogin')

router.route('')
    .post(validateLogin, (req, res) => {
        //Identificar y hacer login
        res.status(200).send(
            {
                status: 'OK',
                message: 'Logged in',
            }
        )
    })

module.exports = router;