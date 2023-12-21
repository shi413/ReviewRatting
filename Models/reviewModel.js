const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
    subject:{
        type: String,
        require: true,
    },
    review:{
        type: String,
        require: true,
    },
    rating:{
        type: String,
        require: true,
    },
    isActive:{
        type: Boolean,
        default: true,
    },
    company_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"userModel",
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"userModel",
    },
    company_logo:{
        type: String,
    },
},{timestamps:true});

let reviewModel = new mongoose.model("reviewModel",reviewSchema);
module.exports = {reviewModel};