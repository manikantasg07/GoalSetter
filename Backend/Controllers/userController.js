const asyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userMode");
const saltRounds = 10;
const jwtPassword = process.env.JWT_PASSWORD
const nodemailer = require("nodemailer");

const registerUser = asyncHandler(async(req,res)=>{
    const {name , email,password} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please add all fields")
    }

    //check if user exists
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("User already Exists");
    }
    bcryptjs.hash(password,saltRounds,async(error,result)=>{
        if(error){
            throw new Error(error);
        }
        const registeredUser= await User.create({
            name,
            email,
            password: result,
        })

        res.status(200).json({
            _id : registeredUser._id,
            name : registeredUser.name,
            email : registeredUser.email,
            token : generateToken(registeredUser._id)
        })
    })
    
})

const loginUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;
    const user  = await User.findOne({email});
    if(user && await bcryptjs.compare(password,user.password)){
        res.status(200).json({
            _id : user._id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id)
        })
    }
    else{
        res.status(400);
        throw new Error("Invalid Credentials")
    }
})

const changePassword = asyncHandler(async(req,res)=>{
    const {email,password,confirmPassword} = req.body;
    if(!password || !confirmPassword || password!=confirmPassword){
        res.status(400)
        throw new Error("Incorrect Passwords");
    }
    const user = await User.findOne({email});
    bcryptjs.hash(password,saltRounds,async(err,result)=>{
        if(err){
            res.status(400)
            throw new Error(err)
        }
        user.password=result;
        // console.log(user);
        const updatedUser = await User.findOneAndUpdate({email},user,{new:true})
        // console.log(updatedUser);
        res.status(200).json(updatedUser)
    })
})

const getMe = asyncHandler(async(req,res)=>{
    res.status(200).json({
    })
})


const generateToken = (id)=>{
    const token = jwt.sign({id},jwtPassword,{
        expiresIn : "30d"
    });
    return token;
}

module.exports = {
    registerUser,
    loginUser,
    getMe,
    changePassword
}