import Express  from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDb from "./connections/mongoDb.js";
import PostRoutes from "./Routes/PostRoutes.js";
import DalleRoutes from "./Routes/DalleRoutes.js";

dotenv.config()

const app=Express();
app.use(cors());
app.use(Express.json({limit:"50mb"}));

app.use("/api/v1/post",PostRoutes);
app.use("/api/v1/dalle",DalleRoutes);

app.get('/',(req,res)=>{
res.send('hello Im Dall-E !');
})

connectDb(process.env.url);

app.listen(process.env.Port,()=>{
    console.log('server statrted');
})