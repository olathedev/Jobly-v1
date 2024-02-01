const { StatusCodes } = require('http-status-codes')
const { BadRequest, NotFoundError } = require('../errors')
const Jobs = require('../models/job-model')



const getAllJobs = async (req, res, next) => {
    const user = req.user.userId

    try {
        const jobs = await Jobs.find({ createdBy: user }).sort('createdAt')
        res.status(StatusCodes.OK).json({ jobs })
    } catch (error) {
        next(error)
    }
}

const getSingleJob = async (req, res, next) => {
    const { user: { userId }, params: { id: jobsId } } = req

    try {

        const job = await Jobs.find({
            _id: jobsId,
            createdBy: userId
        })

        if (!job) {
            throw new NotFoundError(`No job with id ${jobsId}`)
        }

        res.status(StatusCodes.OK).json({ job })

    } catch (error) {
        next(error)
    }
}

const createJob = async (req, res, next) => {
    req.body.createdBy = req.user.userId
    try {
        const job = await Jobs.create(req.body)
        res.status(StatusCodes.CREATED).json({ job })
    } catch (error) {
        next(error)
    }
}


const updateJob = async (req, res, next) => {
    const { 
        body: {company, position},
        user: {userId},
        params: {id: jobId}

    }  = req

    try {
        if(!company || !position) {
            throw new NotFoundError('company and position are required')
        }

        const job = await Jobs.findOneAndUpdate({createdBy: userId, _id: jobId}, req.body, {new: true, runValidators: true})
        if(!job) {
            throw new NotFoundError(`No Job with id - ${jobId}`)
        }
        res.status(StatusCodes.OK).json({job})
    } catch (error) {
        next(error)
    }
}


const deleteJob = async (req, res, next) => {
  
    const {
        user: {userId},
        params: {id}
    } = req

    try {
        const job = await Jobs.findByIdAndDelete({_id: id, createdBy: userId})

        if(!job) {
            throw new BadRequest(`No job with id - ${id}`)
        }

        res.status(StatusCodes.OK).send()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createJob,
    getAllJobs,
    getSingleJob,
    updateJob,
    deleteJob
}