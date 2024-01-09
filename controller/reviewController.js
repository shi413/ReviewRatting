const { companyModel } = require('../Models/companyModel')
const{reviewModel}=require('../Models/reviewModel')

const addReview =async(req,res)=>{
    let findcompany = await companyModel.findOne({_id:req.body.company_id})
    console.log(findcompany)
    if(!findcompany){return res.status(404).send({success:false,message:'Company not found'})}
    let newRatting = await reviewModel.create(req.body)
    res.status(201).send({success:true,message:"Review Created",data:newRatting})
}

const updateReview = async(req,res)=>{
  try {
    let review = await reviewModel.findOne({_id:req.params.id});
    console.log(review)
    if(req.userID!=review.userId){return res.status(400).send({success:false,message:'Not Authorized'})}
    let updateReview=await reviewModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!updateReview){return res.status(400).send({success:false,message:'Couldnot Update'})}
    res.status(200).send({success:true,message:'Review Updated',data:updateReview})
  } catch (error) {
    res.status(500).send({success:false,message:"Server Crashed",error:error.message})
  }
  } 
  const deleteReview = async(req,res)=>{
    try {
      let review = await reviewModel.findById(req.params.id);
      if(req.userID!=review.userId){return res.status(400).send({success:false,message:'Not Authorized'})}
      await reviewModel.findByIdAndDelete(req.params.id);
      res.status(200).send({success:true,message:'Review Deleted'})
      } catch (error) {
          res.status(500).send({success:false,message:"Server Crashed"})
      }
  }

module.exports={addReview,updateReview,deleteReview}
