require('dotenv').config();
const ADMINKEY = process.env.ADMINKEY;
const jwt = require('jsonwebtoken');

//Middleware que verifique el token y su rol
const validateToken = (req, res, next) => {
    const { authorization } = req.headers;
    console.log('authorization: ', authorization);

    try {
        if (authorization) {
            const token = authorization.split(" ")[1];
            const tokenDecoded = jwt.verify(token, ADMINKEY);
            console.log('tokenDecoded: ', tokenDecoded);
            if (!tokenDecoded) {
                return res.status(401).send({
                    error: 'Unauthorized token'
                })
            }
            return next();
        } else {
            res.status(401).send(
                {
                    status: 'Error',
                    message: 'No authorization found',
                }
            )
        }
    } catch (error) {
        console.error('Error on validateToken')
        res.status(500).send(error)
    }
}

module.exports = validateToken;