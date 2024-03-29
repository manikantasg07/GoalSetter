const mongoose= require("mongoose");

const  otpSchema = mongoose.Schema({
    email : {
        type:String,
        required : [true,"Please add an email"],
        unique : true
    },
    otp : {
        type:String
    },
    isVerified  : {
        type : Boolean,
        default : false
    }
},{
    timestamps : true
})

module.exports = mongoose.model("Otp",otpSchema);