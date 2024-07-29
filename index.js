require ('dotenv').config()
const express = require ('express')
const cors = require('cors')
const {checkSchema} = require('express-validator')


const configureDB = require('./config/db')


const userCltr = require ('./app/controllers/user-cltr')


const {authenticateUser, permitUser} = require('./app/middlewares/authentication')
const { userLoginSchema} = require('./app/helpers/user-ValidationSchema')
const { employeeCreateSchema} = require('./app/helpers/employee-ValidationSchema')
const employeeCltr = require('./app/controllers/employee-cltr')


const port = 3346
const app = express()
app.use(express.json())
app.use(cors())
configureDB()


//User
app.post('/api/login',checkSchema(userLoginSchema), userCltr.login)
app.post('/api/register', userCltr.register)

app.post('/api/createEmployee', checkSchema(employeeCreateSchema), employeeCltr.add)
app.get('/api/EmployeeList',authenticateUser, employeeCltr.allEmployees)
app.put('/api/Employee/:eId',authenticateUser, employeeCltr.update)
app.delete('/api/EmployeeDel/:eId',authenticateUser, employeeCltr.deleteEmp)


app.listen(port, ()=>{
    console.log('server running on port', port)
})
