const Joi = require('joi')

const schema = Joi.object({

    company: Joi.string().required().max(50),
    position: Joi.string().required().max(100)

})

const validateJobs = (data) => {
    return schema.validate(data)
}

module.exports = validateJobs