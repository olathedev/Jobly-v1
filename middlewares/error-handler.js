const { StatusCodes } = require('http-status-codes')
const CustomApiError = require('../errors/custom-error')

const errorHandler = (err, req, res, next) => {

    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong Please try again"

    }

    if(err.code && err.code === 11000){
        customError.msg = `${Object.keys(err.keyValue)} already exists in db`
        customError.statusCode = 400
    }
    
    if(err.name === 'CastError') {
        customError.msg = `no item found with id - ${err.value} `
        customError.statusCode = StatusCodes.NOT_FOUND
    }
    return res.status(customError.statusCode).json({message: customError.msg})
    // return res.status(500).json({err})

    // console.log(err);
}


module.exports = errorHandler