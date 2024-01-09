const express = require('express')
const {addReview, updateReview, deleteReview}=require('../controller/reviewController')
const { verifyToken } = require('../Middelware/JWTverify')
const reviewRoutes=express.Router()

reviewRoutes.post("/addreview",addReview)  
reviewRoutes.put("/updatereview/:id",verifyToken,updateReview)   
reviewRoutes.delete("/deleteReview/:id",verifyToken,deleteReview)   


module.exports = {reviewRoutes}



