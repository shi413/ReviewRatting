const { companyModel } = require("../Models/companyModel")
const path = require('path');
const { reviewModel } = require("../Models/reviewModel");

let createcompany = async (req, res) => {
    console.log(req.file);
    let fileLocation =path.join(__dirname,`../${req.file.destination+req.file.filename}`)
    let oldCompany = await companyModel.findOne({ companyName: req.body.companyName })
    if (oldCompany) { return res.status(400).send({ success: false, message: "Company Already exist" }) }

    let newcompany = await companyModel.create({...req.body,company_logo:fileLocation})
    res.status(201).send({ success: true, message: "Company Created", data: newcompany })
}


let companylist = async (req, res) => {
    let allcompany = await companyModel.find().sort({"_id":-1}); //and also company name
    if (allcompany.length == 0) { return res.status(404).send({ success: false, message: "No company found" }) }
    res.status(200).send({
        success: true, message: "All company", total_Companys: allcompany.length,
        data: allcompany
    })

}

let singleCompany = async (req, res) => {
    try {
        // console.log(req.params)
        let company = await companyModel.findById(req.params.id).populate("userId")
        // let company = await companyModel.findOne({_id:req.params.id})
        if (!company) { return res.status(404).send({ success: false, message: 'No Company Found' }) }
        let allreview = await reviewModel.find({company_id:req.params.id}).populate("userId")
        res.status(200).send({ success: true, message: "Company Found", data: company,allreview:allreview,
        TotalReview:allreview.length })
    } catch (error) {
        res.status(500).send({ success:false, message: 'Catch data', data: error.message })
    }
}
let deleteCompany = async(req,res)=>{
    try {
    let company = await companyModel.findById(req.params.id);
    if(!company){return res.status(200).send({success:true,message:"Company doesn't exist"})}
    // console.log(user_Id)
    if(req.userID!=company.userId){return res.status(400).send({success:false,message:'Not Authorized'})}
    await companyModel.findByIdAndDelete(req.params.id);
    res.status(200).send({success:true,message:'Company Deleted'})
    } catch (error) {
        res.status(500).send({success:false,message:"Server Crashed"})
    }
    
}
let searchCompany = async (req, res) => {
    try {
      const { companyName, location, city, founded } = req.body;
      const obj = {};
      if (companyName) {obj.companyName = companyName}
      else if (location) {obj.location = location}
      else if (city) {obj.city = city}
      else if (founded) {obj.founded = founded}
      else {return res.status(400).send({success:false,message:"Invalid Search"})}
      const company = await companyModel.find(obj);
      if (company.length === 0) {
        return res.status(404).send({ success: false, message: "Company doesn't exist" });
      }
      res.status(200).send({ success: true, message: 'Company Searched',Total:company.length, data: company });
    } catch (error) {
        res.status(500).send({success:false,message:"Server Crashed"})
    }
  };
  
module.exports = { createcompany, companylist, singleCompany ,deleteCompany,searchCompany}