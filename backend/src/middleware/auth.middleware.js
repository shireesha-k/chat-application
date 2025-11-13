import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
//to grab token from cookies


//middle ware to check authnticated or not
export const protectRoute=async(req,res,next)=>{
    try{
        //to check token is there or not
        const token=req.cookies.jwt;
        if(!token){
            return res.status(401).json({message:"Unauthorized-No token provided"});
        }

        //we need to decode the token
         const decoded=jwt.verify(token,process.env.JWT_SECRET)
        
         if(!decoded){
            return res.status(401).json({message:"unauthorized-Invalid token"});
         }

         //we dont send password back o he user it is not secure
         const user=await User.findById(decoded.usrId).select("-password");
          //user not found
         if(!user){
            return res.status(404).json({message:"user not found"});
         }

         req.user=uer;

         next();
    }catch(error){
        console.log("Error in protectRoute middleware:",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}