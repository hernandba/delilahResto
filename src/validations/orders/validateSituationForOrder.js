const getSituationForOrder = require('../../database/orders/getSituationForOrder');

const validateSituationForOrder = (req, res, next) => {
    const {situation} = req.body;

    if(!situation){
        return res.status(400).send({
            status: 'error',
            message: 'Uncomplete Data'
        })
    }

    getSituationForOrder(situation).then(result => {
        const situationExists = result;
        console.log(situationExists);

        if (!situationExists) {
            return res.status(404).send({
                status: 'error',
                message: 'Situation for Order Not Found'
            });
        }

        return next();
    })
}

module.exports = validateSituationForOrder;