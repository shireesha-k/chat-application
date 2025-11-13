//the function to create token
import jwt from "jsonwebtoken"
export const generateToken = (userId,res) => {

    const token=jwt.sign({userId},process.env.JWT_SECRET,{ //this is th emain thing where token is created
        expiresIn:"7d", //7 days it will expire soo user has to make login again

    });
    //need to send clinet in the form of cookie soo creating cookies
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,  //helps in crosssite attack
        sameSite:"Strict",
        secure:process.env.NODE_ENV!=="development",
    });
    return token;
};