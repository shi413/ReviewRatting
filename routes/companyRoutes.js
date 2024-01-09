const express =require('express')
const {createcompany,companylist,singleCompany, deleteCompany, searchCompany} =require("../controller/companyController")
const {upload} = require('../helper/multerStorage');
const { verifyToken } = require('../Middelware/JWTverify');
const companyRoutes=express.Router();

companyRoutes.post("/",upload.single("company_logo"),createcompany)
companyRoutes.get("/companylist",companylist)
companyRoutes.get("/singleCompany/:id",singleCompany)   //param
companyRoutes.delete("/company/:id",verifyToken,deleteCompany)
companyRoutes.get("/searchCompany",searchCompany);




module.exports = {companyRoutes}