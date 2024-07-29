const mongoose = require('mongoose')
const {Schema, model}= mongoose

const employeeSchema = new Schema ({
    name : String,
    email : String,
    mobileNo: String,
    designation: String,
    gender : String,
    course : String,
    // imgUpload:String
  
   
}, {timestamps: true})

const Employee = model('Employee', employeeSchema)

module.exports = Employee