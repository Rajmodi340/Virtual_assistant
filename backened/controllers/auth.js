import User from "../models/usermodel.js"
import bcrypt from "bcryptjs"

import genToken from "../config/token.js"

 export const SignUp=async(req,res)=>{
    try{
 const {name,email,password}=req.body;
 const existEmail=await User.findOne({email:email})
    if(existEmail){
        return res.status(400).json({message:"User already exists"})
    }
    if(!password||password.length<6){
        return res.status(400).json({message:"Password must be at least 6 characters"})
    }
    const hashedPassword=await bcrypt.hash(password,10);
const user=await User.create({
    name,password:hashedPassword,email
})
const token= await genToken(user._id);
res.cookie("token",token,{
 httpOnly:true,
       maxAge:7*24*60*60*1000,
       sameSite:"None",
       secure:true
})
return res.status(201).json({
    message:"User created successfully",
})
}
    catch(err){
return res.status(500).json({message:"signup error"})
    }
}
export const Login=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token=await genToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"None",
       secure:true
        })
        return res.status(200).json({
            message:"Login successful",
        })
    }
    catch(err){
        return res.status(500).json({message:"login error"})
    }
}
export const Logout=async(req,res)=>{
    try{
res.clearCookie("token")
return res.status(200).json({message:"Logout successful"})
    }
    catch(err){
        return res.status(500).json({message:"Logout error"})
    }
}
