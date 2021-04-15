"use strict";
const express = require('express');
const router = express.Router();

let bd_users = [{
        id: 1,
        user: 'hernan',
        mail: 'hernan@correo.com',
        pass: 'frida123'
    },
    {
        id: 2,
        user: 'dario',
        mail: 'dario@correo.com',
        pass: 'nico123'
    },
    {
        id: 3,
        user: 'alejandro',
        mail: 'alejo@correo.com',
        pass: 'naruto123'
    },
    {
        id: 4,
        user: 'pablo',
        mail: 'pablo@correo.com',
        pass: 'toña123'
    },
    {
        id: 5,
        user: 'alan',
        mail: 'alan@correo.com',
        pass: 'caballo123'
    },
    {
        id: 6,
        user: 'kevin',
        mail: 'kevin@correo.com',
        pass: 'thot123'
    },
    {
        id: 7,
        user: 'juan',
        mail: 'juan@correo.com',
        pass: 'cali123'
    },
    {
        id: 8,
        user: 'david',
        mail: 'david@correo.com',
        pass: 'warzone123'
    },
];

router.get('/', (req, res) => {
    const { userCred, pass } = req.query;
    let userExists;

    if (userCred) {
        userExists = bd_users.find(r => r.user === userCred || r.mail === userCred);

        if(userExists){
            userExists.pass === pass ? res.send({msj: 'Logged'}) : res.send({msj: 'Wrong pass'});
        }else{
            res.send({msj: 'User not found'})
        }
    }
});

module.exports = router;