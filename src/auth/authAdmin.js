require('dotenv').config();
const ADMINKEY = process.env.ADMINKEY;
const jwt = require('jsonwebtoken');

//Middleware que verifique el token y su rol
const authAdmin = (req, res, next) => {
    const { authorization } = req.headers;
    console.log('authorization: ', authorization);

    try {
        const token = authorization.split(" ")[1];
        const tokenDecoded = jwt.verify(token, ADMINKEY);
        console.log('tokenDecoded: ', tokenDecoded);
        if(tokenDecoded.admin === 1){
           return next();
        }else{
            return res.status(401).send({
                status: 'Error',
                message: 'Unauthorized User Roll'
            })
        }
    } catch (error) {
        console.error('Error on authAdmin')
        res.status(500).send(error)
    }
}

module.exports = authAdmin;