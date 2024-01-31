const { StatusCodes } = require('http-status-codes')
const CustomApiError = require('../errors/custom-error')

const errorHandler = (err, req, res, next) => {

    if(err instanceof CustomApiError) {
        return res.status(err.statusCode).json({message: err.message})
    }
    
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: err.message})
    // console.log(err);
}


module.exports = errorHandler