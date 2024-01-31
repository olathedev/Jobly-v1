const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const verifytoken = (req, res, next) => {

    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(StatusCodes.UNAUTHORIZED).json({message: "Invalid Authentication - No auth token or Bearer is not properly formated"})
    }

    try {
        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: decoded.userId}
        next()
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({message: "Authentication invalid"})
    }
    

}


module.exports = verifytoken