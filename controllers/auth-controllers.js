const { StatusCodes } = require('http-status-codes')
const User = require('../models/auth-model')
const CustomApiError = require('../errors/custom-error')
const {BadRequest, UnAuthenticatedError} = require('../errors')
const validate = require('../validators/user-validator')

const signup = async (req, res, next) => {
    
    try {
        const {error} = validate({...req.body})
        if(error){
            throw new BadRequest(error, StatusCodes.BAD_REQUEST)
        }
        // // const check = await User.find()
        const user = await User.create({...req.body})

        const token = User.createToken(user._id)
        res.status(StatusCodes.CREATED).json({user: {name: user.name, email: user.email}, token})
        
    } catch (error) {
        // console.log(error);
        next(error)
    }

}


const signIn = async (req, res, next) => {
    const {email, password} = req.body
    try {

        if(!email || !password) {
            throw new BadRequest("Email and Password cannot be empty", StatusCodes.BAD_REQUEST)
        }

        const user = await User.findOne({email})
        if(!user) {
            throw new UnAuthenticatedError("email not registered", StatusCodes.UNAUTHORIZED)
        }

        const isMatch = await User.comparePassword(password, user.password)
        if(!isMatch) {
            throw new UnAuthenticatedError("Incorrect password", StatusCodes.UNAUTHORIZED)
        }
        
        const token = User.createToken(user._id)
        res.status(StatusCodes.OK).json({User: {name: user.name, email: user.email}, token})

    } catch (error) {
        next(error)
    }
}


module.exports = {
    signup,
    signIn
}
