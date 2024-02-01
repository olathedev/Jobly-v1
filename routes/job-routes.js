const express = require('express')
const { createJob, getAllJobs, getSingleJob, updateJob, deleteJob } = require('../controllers/job-controllers')

const router = express.Router()

router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').get(getSingleJob).delete(deleteJob).patch(updateJob)


module.exports = router