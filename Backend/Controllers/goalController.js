const asyncHandler = require("express-async-handler");
const Goal = require("../model/goalModel");

const getGoals = asyncHandler(async(req,res)=>{
    const goals = await Goal.find({user:req.user._id});

    res.status(200).json({
        goals
    })
})

const setGoal = asyncHandler(async(req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error("Text field Required")
    }
    const goal= await Goal.create({user : req.user._id,text : req.body.text})
    res.status(200).json({
        goal
    })
})

const updateGoal = asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id);
    if(!goal){
        res.status(400);
        throw new Error("Goal not found");
    }
    if(goal.user.toString()!=req.user._id){
        res.status(401);
        throw new Error("User not authorized")
    }
    if(!req.body.text){
        res.status(400);
        throw new Error("Text is required");
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    })
    res.status(200).json({
       updatedGoal
    })
})

const deleteGoal = asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id);
    if(!goal){
        res.status(400)
        throw new Error("Goal Not found");
    }
    if(goal.user.toString()!=req.user._id){
        res.status(401);
        throw new Error("User not authorized")
    }
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json({
        deletedGoal
    })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}