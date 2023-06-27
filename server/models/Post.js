import mongoose from "mongoose";

const Post=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    prompt:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
});

export default mongoose.model("Post",Post);