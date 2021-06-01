const searchUser = require('../../database/users/searchUser');

const validateUserId = (req, res, next) => {
    const {id_user} = req.params;

    if(!id_user){
        return res.status(400).send({
            status: 'error',
            message: 'Uncomplete Data'
        })
    }

    searchUser({username: "", email: "", id_user: id_user}).then(result => {
        const userExists = result;
        console.log(userExists);

        if (!userExists) {
            return res.status(404).send({
                status: 'error',
                message: 'User not found'
            });
        }

        return next();
    })
}

module.exports = validateUserId;