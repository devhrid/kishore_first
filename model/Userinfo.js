const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    hobby: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
  
})

const Userinfo = mongoose.model('Userinfo', userSchema)
module.exports = Userinfo