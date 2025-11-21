
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs"
import cloudinary from "../lib/cloudinary.js";

//  this function saving the user details in database and hashimg the password and creating token for the user
export const signup=async(req,res)=>{
    const {fullName,email,password}=req.body;
    try{

        if(!fullName||!email|| !password){
            return res.status(400).json({message:"All fields are required"});
        }

       if(password.length<6){
        return res.status(400).json({message:"Password must be atleast 6 charcaters"});
       }

       const user=await User.findOne({email})
       
       if(user) return res.status(400).json({message:"Email already exists"});

       const salt=await bcrypt.genSalt(10)
       const hashedPassword=await bcrypt.hash(password,salt)

       const newUser=new User({
        fullName:fullName,
        email:email,
        password:hashedPassword
       })
       //genearting the token here
       if(newUser){
           generateToken(newUser._id,res) // mongodb stores as _id and res to send cookie
           await newUser.save();  //save user to database

           res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            profilePic:newUser.profilePic,
           })
       }else{
        res.status(400).json({message:"Invalid user data"});
       }
    }catch(error){
        console.log("Error in signup Conroller,error.message");
        res.status(500).json({message:"Internal server error"});
    }

};

 //this function for the login od the user compares hashed and user entered password
export const login= async(req,res)=>{
    const {email,password}=req.body;
    try{
     
        const user=await User.findOne({email})
         
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const isPasswordCorrect=await bcrypt.compare(password,user.password);

        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid crendentials"});
        }

        generateToken(user._id,res)
         
       res.status(201).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic,
           })

    }catch(error){
        console.log("Error in login controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }

};

//when user logsout just clean the cookies
export const logout=(req,res)=>{
     try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});

     }catch(error){
        console.log("Error in logout Controller",error.message);
        res.status(500).json({messsage:"Internal Server Error"});
     }

};
//if he is authenticated we call thsi function
export const updateProfile=async(req,res)=>{
   try{
     const {profilePic} =req.body;
     const userId=req.user._id;

     if(!profilePic){
        return res.status(400).json({message:"Profile pic i required"});
     }

     const uploadResponse=await cloudinary.uploader.upload(profilePic)
     const updateUser=await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true })

     res.status(200).json(updateUser)
   }catch(error){
      console.log("Error in update profile",error);
      res.status(500).json({message:"Internal Server error"});
   }

};

export const checkAuth=(req,res) =>{
    try{
        res.status(200).json(req.user);
    }catch(error){
        console.log("Error in checkAuth controller",error.message);
        res.status(500).json({message:"Internal Server error"});
    }
};