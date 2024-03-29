const Otp= require("../model/otpModel");
const User = require("../model/userMode");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const nodemailer = require("nodemailer");
const saltRounds = 10;

const transporter = nodemailer.createTransport({
    // Use `true` for port 465, `false` for all other ports
  service : "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
    auth: {
      user: "manikantaganti@gmail.com", 
      pass: `${process.env.APP_PSWD}`,
    },
  });

 const emailToVerify = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    if(!email){
        res.status(400);
        throw new Error("Email is required");
    }
    const user = await User.findOne({email});
    if(!user){
        res.status(400);
        throw new Error("Not an exisitng user");
    }
    const otp = Math.floor(Math.random() * 9000) + 1000;
    var mailOptions = {
        from: 'manikantaganti@gmail.com',
        to: email,
        subject: 'Verify Otp',
        html: `<p> Here is the opt for verification <b>${otp}</b>. The otp expires in 5 minutes</p>`
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          throw new Error(error)
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.status(200).json({email});
      bcrypt.hash(otp.toString(),saltRounds,async(err,result)=>{
        if(err){
            res.status(400);
            throw new Error(err);
        }
        const otpObject = await Otp.findOneAndUpdate({email},{email,otp:result},{upsert : true},{new:true});
    })
})


const verifyOtp = async(req,res,next)=>{
  if(!req.body.otp || !req.body.email){
    res.status(400);
    throw new Error("Email and otp amd required");
  }
  const {email,otp} = req.body;
  const otpToBeVerified = await Otp.findOne({email});
  bcrypt.compare(otp,otpToBeVerified.otp,async(err,result)=>{
    if(err){
      res.status(400);
      throw new Error(err);
    }
    if(!result){
      const error = new Error("Wrong Otp")
      res.status(400);
      return next(error)
    }
    otpToBeVerified.isVerified=true;
    res.status(200).json({
      email:otpToBeVerified.email,
      isVerified : otpToBeVerified.isVerified
    })
    const deleteOtp = await Otp.deleteOne({email});
  })
}


module.exports={
    emailToVerify,
    verifyOtp
}