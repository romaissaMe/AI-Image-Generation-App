import mongoose from "mongoose";


const connectDb = async (url)=>{
    try{
        await mongoose.connect(url);
        console.log("connected to database");
    }
    catch(error){
        console.log(error.message);
    }
}
export default connectDb;