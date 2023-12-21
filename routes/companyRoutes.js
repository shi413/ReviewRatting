const express =require('express')
const {createcompany,companylist} =require("../controller/companyController")
const companyRoutes=express.Router();

companyRoutes.post("/",createcompany)
companyRoutes.get("/companylist",companylist)


module.exports = {companyRoutes}