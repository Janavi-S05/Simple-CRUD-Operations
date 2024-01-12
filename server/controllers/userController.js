const userModel=require("../models/userModel");
const asyncHandler = require("express-async-handler");// automatically handles the exception
const getUsers = asyncHandler(async (req, res) => {
    const users=await userModel.find();
    console.log(users);
    res.status(200).json(users);
});

const getUser=asyncHandler(async(req,res)=>{
    const user=await userModel.findById(req.params.id);
    if(!user)
    {
        res.status(404);
        throw new Error("user not found");
    }
    res.status(200).json(user);
})

const createUser=asyncHandler(async(req,res)=>{
    console.log("Req body",req.body);
    const {name,email}=req.body;
    if (!name || !email) {
        res.status(400);
        throw new Error("All are mandatory fields");
    }
    // Fetch the length of existing contacts
    const existingUsers = await userModel.find();
    const existingUsersCount = existingUsers.length;

    // Generate a new _id by incrementing the length
    const newContactId = existingUsersCount + 1;
    const user=await userModel.create({
        _id:newContactId,
        name,email,
    });
    res.status(201).json(user);
})

const updateUser=asyncHandler(async(req,res)=>{
    const user=await userModel.findById(req.params.id);
    if(!user)
    {
        res.status(404);
        throw new Error("user not found");
    }
    const updatedUser=await userModel.findByIdAndUpdate(
        req.params.id,req.body,{new:true} 
    );
    res.status(200).json(updatedUser);
})


const deleteUser=asyncHandler(async(req,res)=>{
    const user=await userModel.findById(req.params.id);
    if(!user)
    {
        res.status(404);
        throw new Error("user not found");
    }
    await userModel.deleteOne({_id:req.params.id});
    res.status(200).json(user);
})
module.exports={getUsers,getUser,createUser,updateUser,deleteUser};