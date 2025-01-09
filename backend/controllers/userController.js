import express from 'express'
import ShopUser from '../models/User.js'
import bcrypt from 'bcrypt';
import { generateToken } from '../middlewares/authMiddleware.js';


//Register Api
const handleUserRegister=async(req,res)=>
{
    try{
       const  {firstName, lastName,email,password, phoneNumber} = req.body;


       const hashPassword=await bcrypt.hash(password,10)

       const user=await ShopUser.create({firstName, lastName,email,password:hashPassword,phoneNumber})
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

        const user=await ShopUser.findOne({email})
        if(!user)
        {
           return  res.status(404).send({message:'User not found'})
        }
           
         const isPasswordValid = await bcrypt.compare(password, user.password); 
         if (!isPasswordValid) 
         {
             return res.status(401).send({ message: 'Invalid password' }); 
         }
         

        //  const token=await generateToken(user._id)
        
        const token=await generateToken(user)
         console.log('generated token',token)
       
      res.status(200).json({ message: 'User login successful',token,user });

    }
    catch(error)
    {
        console.error("Error while logging in user",error)
        res.status(500).send({message:'Internal Server error'})
    }
};

const handleDeleteUser=async(req,res)=>
{
   try
   {
    const {id}=req.params;
    console.log("id",id);
    const user=await ShopUser.findByIdAndDelete(id);
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
        const users=await ShopUser.find({})
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
    // const {role}=req.body;
   const  {profileImage,bio,profession,firstName, lastName,email,password, phoneNumber}=req.body;
    const user=await ShopUser.findByIdAndUpdate(id,{profileImage,bio,profession,firstName, lastName,email,password, phoneNumber},{new:true});
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
  const {userId,firstName,profileImage,bio,profession}=req.body
  if(!userId)
  {
    return res.status(400).send({message:'User ID is required'})
  }
  const user=await ShopUser.findById(userId);
  console.log(user)
  if(!user)
  {
    return res.status(404).send({message:"User not found"})
  }

if(firstName!==undefined)user.firstName=firstName;
if(profileImage !==undefined)user.profileImage=profileImage;
if(bio !==undefined)user.bio=bio;
if(profession !==undefined)user.profession =profession;

await user.save();
res.status(200).send({
    message:"profile updated successfully",
    user:{
        _id: user._id,
        email: user.email,
        userName: user.firstName,
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



export {handleUserRegister,handleLogin,handleDeleteUser,handleAllUsers,handleUpdateUser,handleProfile}