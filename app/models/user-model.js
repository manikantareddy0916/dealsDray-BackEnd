const mongoose = require('mongoose')
const {Schema, model}= mongoose

const userSchema = new Schema ({
    userName : String,
    password : String,
    role : {
        type : String,
        enum : ['admin'],
    }
  
   
}, {timestamps: true})

const User = model('User', userSchema)

module.exports = User