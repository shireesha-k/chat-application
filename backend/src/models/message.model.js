import mongoose from "mongoose";


//cretaing the schema
const messageSchema =new mongoose.Schema(
    {
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        receiverId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        text:{
            type:String,
        },
        image:{
            type:String,
        },
        
    },
    {timestamps:true}
);

//cretaing the model
const Message=mongoose.model("Message",messageSchema);

//exporing the model forol later use 
export default Message;