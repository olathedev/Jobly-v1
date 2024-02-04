const Joi = require('joi')

const schema = Joi.object({
    name: Joi.string().required().max(30),
    email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required().max(10)
})


const validate = (data) => {
    return schema.validate(data)
    
}

module.exports = validate