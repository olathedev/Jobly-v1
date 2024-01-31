const express = require('express')
const { createJob, getAllJobs } = require('../controllers/job-controllers')

const router = express.Router()

router.route('/').post(createJob).get(getAllJobs)
router.route('/:id').delete().patch()


module.exports = router