const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {     
        type: String,
        required: [true, "Provide a name field"]
    },

    email: {
        type: String,
        unique: true,
        required: [true, "Provide a name field"], 
    },
    password: {
        type: String,
        required: [true, "Provide a name field"]
    },
}, {timestamps: true})



UserSchema.pre('save', async function(){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.statics.createToken = function(id) {
    return jwt.sign({userId: id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })

}

UserSchema.statics.comparePassword = async function(candidatePassword, password) {
    const match = await bcrypt.compare(candidatePassword, password)
    return match
}



module.exports = mongoose.model('User', UserSchema)