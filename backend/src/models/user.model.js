import mongoose from "mongoose";


//cretaing the schema
const userSchema =new mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            unique:true,
        },
        fullName:{
            type:String,
            required:true,
        },
        password:{
            type:String,
            required:true,
            minlength:6,
        },
        profilePic:{
            type:String,
            default:"",
        },
    },
    {timestamps:true}
);

//cretaing the model
const User=mongoose.model("User",userSchema);

//exporing the model forol later use 
export default User;