const Employee = require('../models/employee-model')
const _ = require('lodash')
const {validationResult} = require('express-validator')
const User = require('../models/user-model')

const employeeCltr ={}

//Address adding
employeeCltr.add = async function (req,res){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    console.log('hj',req.body)
    const body = _.pick(req.body, ['name', 'email', 'designation','mobileNo','gender','course','imgUpload']); // Specify required fields
    //const body = req.body
   // console.log('bg',body)
   //console.log('my')
    try{
       //console.log('kk',body)
       const user = await Employee.findOne({email: body.email})
       //console.log('j',user)
       if(user){
        return res.status(404).json({errors: [{ msg: 'mail Already exist try new'}]})
       }else{
        
        const employee = new Employee(body)
        await employee.save()
        res.status(201).json(employee)
        //console.log('afff',address)
       }
      
    }
    catch(e){
        res.status(500).json(e)
    }
}

//get employees all
employeeCltr.allEmployees = async function(req,res){
    try{
        const employee = await Employee.find()
        res.status(200).json(employee)
    }
    catch(e){
        res.status(500).json(e)
    }
}

//Edit employee
employeeCltr.update = async function(req,res){
    try{
        const eId = req.params.eId
        const body = req.body
        const employee = await Employee.findOneAndUpdate({_id: eId },body)
        res.status(200).json(employee)
    }catch(e){
        res.status(500).json(e)
    }
}

//delete emp
employeeCltr.deleteEmp = async function(req,res){
    try{
        const eId = req.params.eId 
        const emp = await Employee.findOneAndDelete({_id: eId})
        res.status(200).json(emp)
    }
    catch(e){
        res.status(500).json(e)
    }
}

module.exports = employeeCltr