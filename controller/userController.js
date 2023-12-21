const {userModel} = require('../Models/userModel')

const registration = async(req,res)=>{
    let user = await userModel.findOne({email:req.body.email})

    if(user){
        return res.status(409).send({success:false,message:'Email already exist'})
    }

    let newuser = await userModel.create(req.body)
    res.status(201).send({success:true,message:'Registered Successfully',data:newuser})
}

let login = async(req,res)=>{

    let {email,password}=req.body;
    let user = await userModel.findOne({email:email})

    if(!user){return res.status(404).send({success:false,message:"Email not exist"})
}
if(password !=user.password){return res.status(409).send({success:false,message:'Wrong Password'})}
res.status(200).send({success:true,message:'Login Successfully', data:user})
}
module.exports={registration,login}