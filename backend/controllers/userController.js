import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcrypt';
import { generateToken } from '../middlewares/userMiddleWare.js';


//Register Api
const handleUserRegister=async(req,res)=>
{
    try{
       const  {userName,email,password} = req.body;

       const hashPassword=await bcrypt.hash(password,10)

       const user=await User.create({userName,email,password:hashPassword})
      res.status(201).send({message :"User created successfully",user})

    }
    catch(error)
    {
  console.error('Error registering user',error)
  res.status(500).send({message:"Internal server error"})
    }
};

//login User endpoint
const handleLogin=async(req,res)=>
{
    try{
        const {email,password}=req.body;

        const user=await User.findOne({email})
        if(!user)
        {
           return  res.status(404).send({message:'User not found'})
        }
           
         const isPasswordValid = await bcrypt.compare(password, user.password); 
         if (!isPasswordValid) 
         {
             return res.status(401).send({ message: 'Invalid password' }); 
         }

         const token=await generateToken(user._id)
         console.log('token',token)
       
         res.cookie('token',token,
            {
                httpOnly:true,
                secure:true,
                sameSite:'None',
            }
         )

      res.status(200).send({ message: 'User login successful',token,user });

    }
    catch(error)
    {
        console.error("Error while logging in user",error)
        res.status(500).send({message:'Internal Server error'})
    }
};

//All user endpoint
const handleLogout=async(req,res)=>
{
    res.clearCookie('token');
    res.status(200).send({message:"Logged out successfully"})
};
const handleDeleteUser=async(req,res)=>
{
   try
   {
    const {id}=req.params;
    console.log("id",id);
    const user=await User.findByIdAndDelete(id);
    if(!user)
    {
      return res.status(404).send({message:'User not found'})
    }
    return res.status(200).send({message:"User Deleted successfully",user})
   }
   catch(error)
   {
    console.error("Error while deleting user");
    res.status(500).send({message:'Internal server error'})
   }
};

//get all users
const handleAllUsers=async(req,res)=>
{
    try{
        const users=await User.find({})
        res.status(200).send({message:"Get all users successfully",users})
    }
    catch(error)
    {
    console.error("Error fetching all users",error)
    res.status(500).send({message:"Error fetching user"})
    }
};

//update user information
const handleUpdateUser=async(req,res)=>
{
    try
    {const {id}=req.params;
    const {role}=req.body;
    const user=await User.findByIdAndUpdate(id,{role},{new:true});
    if(!user)
    {
        return res.status(404).send({message:"User not found"})
    }
    res.status(200).send({message:"User role updated successfully",user})

    }
    catch(error)
    {
        console.error("Error while updaing user")
        res.status(500).send({message:"internal server error"})
    }
};

const handleProfile=async(req,res)=>
{
   try{
  const {userId,userName,profileImage,bio,profession}=req.body
  if(!userId)
  {
    return res.status(400).send({message:'User ID is required'})
  }
  const user=await User.findById(userId);
  console.log(user)
  if(!user)
  {
    return res.status(404).send({message:"User not found"})
  }

if(userName !==undefined)user.userName=userName;
if(profileImage !==undefined)user.profileImage=profileImage;
if(bio !==undefined)user.bio=bio;
if(profession !==undefined)user.profession =profession;

await user.save();
res.status(200).send({
    message:"profile updated successfully",
    user:{
        _id: user._id,
        email: user.email,
        userName: user.userName,
        role: user.role,
        profileImage: user.profileImage,
        bio: user.bio,
        profession: user.profession,
    } ,  
});
   } 
   catch(error)
   {
   console.error("Error updating user file",error)
   res.status(500).send({message:"Error updating user profile"})
   }
}



export {handleUserRegister,handleLogin,handleLogout,handleDeleteUser,handleAllUsers,handleUpdateUser,handleProfile}