import express from "express"

import mongoose from "mongoose";

import dotenv from 'dotenv';

import userRoutes from "./routes/user.route.js"
import authRoutes from "./routes/auth.route.js"


//to access token from the browser
import cookieParser from "cookie-parser";


dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Database Connected!")
}).catch((err)=>{
    console.log(err);
});


const app=express();


app.listen(3000,()=>{
    console.log('Server is running on port 3000!!');
});

app.use(express.json()); //to send the json data while testing from postman
app.use(cookieParser());

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);




//(req,res,next) ko lagi
app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || 'Internal Server Error!';

    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
})