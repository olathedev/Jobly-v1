const { StatusCodes } = require('http-status-codes')
const Jobs = require('../models/job-model')



const getAllJobs = async (req, res, next) => {
    const user = req.user.userId

    try {
        const jobs = await Jobs.find({createdBy: user}).sort('createdAt')
        res.status(StatusCodes.OK).json({jobs})
    } catch (error) {
        next(error)
    }
}


const createJob = async (req, res, next) => {
    req.body.createdBy = req.user.userId
    try {
        const job = await Jobs.create(req.body)
        res.status(StatusCodes.CREATED).json({job})
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createJob,
    getAllJobs
}