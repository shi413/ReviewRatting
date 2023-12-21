const express = require('express')
require('./Dbconnection/connection')
const {userRoutes} = require('./routes/userRoutes')
const {companyRoutes} = require('./routes/companyRoutes')
const app=express();
app.use(express.json())
let PORT = 5000 

app.use('/user',userRoutes)
app.use('/company',companyRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`);
})