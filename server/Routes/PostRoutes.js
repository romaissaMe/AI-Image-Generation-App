import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import { v2 as cloudinary } from 'cloudinary';
import Post from "../models/Post.js";


dotenv.config();

const router= express.Router();

const config = new Configuration({
    apiKey:process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

cloudinary.config({
    cloud_name: "dbkxq50xr",
    api_key: "983478594534853",
    api_secret: "ygxb2B-_wDsRD7ufYs09CqbnPyw"
});

router.route("/").get(async(req,res)=>{
try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
    } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
    }

});

router.route('/').post(async(req,res)=>{
    try{
    const {photo,searchedText,name}=req.body
    const photourl = await cloudinary.uploader.upload(photo)
    const newPost = await Post.create({
        name,
        prompt:searchedText,
        url:photourl.url,
    })
    res.status(200).json({success:true,data:newPost})
    }
    catch(err){
        res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
    }
});


export default router;
