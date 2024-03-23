const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User= require("../model/userMode");

const protect = asyncHandler(async(req,res,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token=req.headers.authorization.split(" ")[1];
        try{
            const decoded= jwt.verify(token,process.env.JWT_PASSWORD);
            req.user = await User.findById(decoded.id).select('-passowrd');
            next();
        }
        catch(error){
            // console.log(error);
            res.status(401);
            throw new Error("Not Authorized");
        }
    }
    if(!token){
        res.status(401);
            throw new Error("Not Authorized");
    }
})


module.exports= {protect}