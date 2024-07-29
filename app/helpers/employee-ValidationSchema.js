const Employee = require('../models/employee-model')



const nameSchema ={
    notEmpty : {
        errorMessage : 'name is required'
    },
    
}
// const imgUploadSchema = {
//     notEmpty:{
//         errorMessage:' image is required'
//     }
// }
const  emailSchema= {
    notEmpty : {
        errorMessage : 'email is required'
    },
    isEmail : {
        errorMessage : 'valid email is required'
    }
}
const mobileNoSchema = {
    notEmpty:{
        errorMessage:' mobileNumber is required'
    },
    isLength:{
        options: { min:10, max:10}
    }
}
const designationSchema = {
    notEmpty:{
        errorMessage:' designation is required'
    }
}
const courseSchema = {
    notEmpty:{
        errorMessage:' course is required'
    }
}
const genderSchema ={
    notEmpty : {
        errorMessage : 'gender is required'
    }
}



const employeeCreateSchema = {
    name : nameSchema,
    email : emailSchema,
    mobileNo : mobileNoSchema,
    designation : designationSchema,
    gender : genderSchema,
    course : courseSchema,
    //imgUpload : imgUploadSchema,

}

module.exports =    {employeeCreateSchema}
