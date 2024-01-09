const {userModel} = require('../Models/userModel')
const path = require('path')
const nodemailer = require("nodemailer")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config()
const {hashPass, comparePassword} = require('../helper/bcrypt')
var validator =require('validator')


const registration = async(req,res)=>{
    // console.log(req.file);
    let {email} = req.body
    if(!validator.isEmail(email)){return res.status(400).send({success:false,message:'Email Validation Failed'})}
    let fileLocation =path.join(__dirname,`../${req.file.destination+req.file.filename}`)
    let user = await userModel.findOne({email:req.body.email})
    if(user){
        return res.status(409).send({success:false,message:'Email already exist'})
    }
    let hasspassword=await hashPass(req.body.password)
    let newuser = await userModel.create({...req.body,password:hasspassword,profilepic:fileLocation}) 
    console.log(newuser)
    res.status(201).send({success:true,message:'Registered Successfully',data:newuser})
}

let login = async(req,res)=>{

    let {email,password}=req.body;
    let user = await userModel.findOne({email:email})

    if(!user){return res.status(404).send({success:false,message:"Email not exist"})}
    const matchedPassword = await comparePassword(password,user.password)
if(!matchedPassword){return res.status(409).send({success:false,message:'Wrong Password'})}

    var token = jwt.sign({user:user},process.env.JWTKEY,{ expiresIn: "30D" })
    res.setHeader("token",token)
    res.status(200).send({success:true,message:'Login Successfully', data:user,token:token})
}

let updatePassword = async (req, res) => {
    try {
      let user = await userModel.findOne(req.params.email);
      if (!user) {return res.status(404).send('User does not exist')}
      if (req.body.newPassword !== req.body.ConPassword) {
        return res.status(400).send('New password does not match confirmation password');
      }
      // Hash the new password
      let hashedPassword = await hashPass(req.body.newPassword);
      // Update user's password in the database
      user.password = hashedPassword;
      let updateUser = await user.save();
      res.status(200).send({ success: true, message: 'Password updated successfully', user: updateUser });
    } catch (error) {
      res.status(500).send({ success: false, message: 'Server Error' });
    }
  };
  
  let forgetPassword = async(req,res)=>{
    // let user = await userModel.findOne({email:req.body.email})
    // if(!user){return res.status(400).send({status:false,message:"Email not found"})}
    try {
        const transporter = nodemailer.createTransport({
          service:"gmail",
          auth:{
            user: "sp8316886@gmail.com",
            pass: "xisr tvmf xeyz rswx",
          }
        })
        let details = {
          from:"sp8316886@gmail.com",
          to:req.body.email,
          subject:"Hello it is me",
          text:"cxjkxnvjz",
        }
        transporter.sendMail(details,async(err)=>{
          if (err) {
            res.status(400).send({success:false,message:err.message})
          } else {
            res.status(200).send({success:true,message:"Email Send"})
          }
        })
    } catch (error) {
      res.status(500).send({success:false,message:'Server Crashed'})
    }
  }

let deleteUser = async(req,res)=>{
    let user = await userModel.findById(req.params.id);
    if(!user){return res.status(200).send({success:true,message:'User Doesnt found'})}
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).send({success:true,message:'User Deleted'})
}

module.exports={registration,login,deleteUser,updatePassword,forgetPassword}