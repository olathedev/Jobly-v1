const {StatusCodes} = require('http-status-codes')

const notFOund = (req, res, next) => {
    return res.status(StatusCodes.NOT_FOUND).json({msg: `Path ${req.originalUrl} not found`})
}

module.exports = notFOund