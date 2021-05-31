const searchUser = require('../../database/users/searchUser');

const validateLogin = (req, res, next) => {

    const { credential, password } = req.body;

    if (!credential || !password) {
        return res.status(400).send({
            status: 'error',
            message: 'Uncomplete Data'
        })
    }

    searchUser(credential).then(result => {
        const userExists = result;
        console.log(userExists);

        if (!userExists) {
            return res.status(404).send({
                status: 'error',
                message: 'User not found'
            });
        }

        if (userExists.password !== password) {
            return res.status(403).send({
                status: 'error',
                message: 'Wrong password'
            });
        }

        return next();
    })
}

module.exports = validateLogin;