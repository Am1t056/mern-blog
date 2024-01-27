import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup=async (req,res,next)=>{
    const {username,email,password}=req.body;

    if(!username || !email || !password || username =='' || email==''||password==''){
     next(errorHandler(400,'All fields are required!'));
    }

    const hashedpassword=bcryptjs.hashSync(password,10);

    const newUser=new User({
        username,
        email,
        password:hashedpassword,
    })

    try {
        await newUser.save();
        res.json('SignUp Successfull!')
    } catch (error) {
        next(error);
    }
};


//For Signin api
export const signin=async (req,res,next)=>{

    const {email,password}=req.body;
    if(!email || !password || email=== '' || password=== ''){
        next(errorHandler('400','All fields are required!'));
    }
    try {
        const validuser=await User.findOne({email});
        if(!validuser){
           return next(errorHandler(404,'User not found!'));   //better to not give the clue of invalid user to the hacker, intead we can write invalid credentials
        }

        const validPassword=bcryptjs.compareSync(password,validuser.password);
        if(!validPassword){
          return  next(errorHandler(400,'Invalid Password!'));    //better to not give the clue of invalid password to the hacker, intead we can write invalid credentials
        }

        const token=jwt.sign({id: validuser._id },process.env.JWT_SECRET);
      
       const {password: pass, ...rest}=validuser._doc;

        res.status(200).cookie('access_token',token,{
            httpOnly:true }).json(rest);
        
    } catch (error) {
        next(error);
    }

}