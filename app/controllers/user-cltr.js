const User = require('../models/user-model')
const _ = require('lodash')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')


const userCltr = {}

//Register
userCltr.register = async function (req,res){
    
    const body = _.pick(req.body,['userName','password']) 
    
    try{
        const user = new User(body) 
        const salt = await bcryptjs.genSalt()
        const hashedPassword = await bcryptjs.hash(user.password, salt)
        user.password = hashedPassword
        
        const userSave =await user.save()

        if(userSave){
            //console.log('uer',userSave)
            res.status(201).json({msg:"Congratulations, You are registered! Check you email to sign in."})
           
        }
        }
    catch(e){
        //internal server error
        console.log('error')
        res.status(500).json(e)
    }
}

//Login
userCltr.login = async function (req,res){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({ errors : errors.array()})
    }
    const body= _.pick(req.body,['userName','password'])
    console.log('jj',process.env.adminName)
    try{
         //verfing email
         const user = await User.findOne({email: body.email})
         //console.log('1',user)
         if(!user){
             return res.status(404).json({errors: [{ msg: 'invalid email/password'}]})
         }
         //verfing password  
         const result = await bcryptjs.compare(body.password , user.password)
         //console.log('2',result)
         if(!result){
             return res.status(404).json({errors: [{msg : 'invalid email/password'}]})
         }
         //token generating and Bearer
         const tokenData = {id : user._id, adminName : process.env.adminName  } 
         const token = jwt.sign(tokenData, process.env.JWT_SECRET)
         res.status(200).json({token : `Bearer ${token}`})
    }
    catch(e){
        res.status(500).json(e)
    }
}
//Account
userCltr.account = async function(req,res){
    try{
        const user = await User.findById(req.user.id).populate('products',['_id','productName']).populate('address').populate('rentalDetails')
       // console.log('jj',user)
        
            //console.log('User populated successfully:', user);
            res.status(200).json(user);
        
    }
    catch(e){
        res.status(500).json({ errors: 'something went wrong/add token'})
    }
}


module.exports = userCltr