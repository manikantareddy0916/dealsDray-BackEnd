const User = require('../models/user-model')



const userNameLoginSchema ={
    notEmpty : {
        errorMessage : 'username is required'
    }
    
}

const passwordSchema = {
        notEmpty : {
            errorMessage : 'password is required'
        },
        isStrongPassword: {
            options:{
                minLength:3,
                minUpperCase:1,
                minLowerCase:1,
                minSymbols:1
            },
            errorMessage : 'use atleast One Uppercase & LowerCase & Symble & Number'
        }
}



const userLoginSchema = {
    userName : userNameLoginSchema,
    password : passwordSchema
}

module.exports =    {userLoginSchema}
