const express =require('express')
const { registration, login, deleteUser, updatePassword, forgetPassword } = require('../controller/userController')
const {upload}=require('../helper/multerStorage')
const { verifyToken } = require('../Middelware/JWTverify')
let userRoutes = express.Router()

// userRoutes.get('/',(req,res)=>{
//     res.send("userRoutes")
// })

userRoutes.post('/registerUser',upload.single("profilepic"),registration)
//for upload multiple file
// userRoutes.post('/registerUser',upload.array("profilepic",3),registration)
userRoutes.post('/login',login)
userRoutes.post('/updatePassword',verifyToken ,updatePassword)
userRoutes.delete("/user/:id",deleteUser)
userRoutes.post('/forgetPassword',forgetPassword)


module.exports={userRoutes}
