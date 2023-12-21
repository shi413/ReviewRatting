const {companyModel} =require("../Models/companyModel")

let createcompany = async(req,res)=>{
   let oldCompany = await companyModel.findOne({companyName:req.body.companyName})
   if(oldCompany){return res.status(400).send({success:false,message:"Company Already exist"})} 

    let newcompany = await companyModel.create(req.body)
    res.status(201).send({success:true,message:"Company Created",data:newcompany})
}

let companylist = async(req,res)=>{
    let allcompany = await companyModel.find();
    if(allcompany.length==0){return res.status(404).send({success:false,message:"No company found"})}
    res.status(200).send({success:true,message:"All company",total_Companys:allcompany.length,
    data:allcompany})

}



module.exports={createcompany,companylist}