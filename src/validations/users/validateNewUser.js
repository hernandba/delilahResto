const searchUser = require('../../database/users/searchUser');

const validateNewUser = (req, res, next) => {
    const {username, fullname, email, phone, address} = req.body;

    if(!username || !fullname || !email || !phone || !address){
        return res.status(400).send({
            status: 'error',
            message: 'Uncomplete Data'
        })
    }

    searchUser({username: username, email: email}).then(result => {
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
}

module.exports = validateNewUser;