const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required."],
        unique: true,
        minLength: [3,"username is too short."]
    },
    name: String,
    password: {
        type: String,
        required: [true, "password is required."]
    }
})

userSchema.plugin(uniqueValidator,{ message: '{PATH} has to be unique.'})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

module.exports = mongoose.model('User', userSchema)