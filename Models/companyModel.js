const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
    companyName:{
        type: String,
        require: true,
    },
    location:{
        type: String,
        require: true,
        default: false,
    },
    city:{
        type: String,
        require: true,
    },
    founded:{
        type: String,
        require: true,
    },
    isActive:{
        type: Boolean,
        default: true,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"userModel",
    },
    company_logo:{
        type: String,
    },
},{timestamps:true}
);

let companyModel = new mongoose.model("companyModel",companySchema);
module.exports = {companyModel};