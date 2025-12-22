import User from "../models/User.model.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import sendEmail from "../utils/sendEmail.utils.js";

export const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body
        if(!name || !email || !password){
            return res.status(400).json({message:"All filed are required"})
        }
        const existingUser =await User.findOne({email})
         if(existingUser){
            return res.status(400).json({message:"User already exists"})
         }
         //hash pw

         const salt = await bcryptjs.genSalt(10);
         const hashPW=await bcryptjs.hash(password,salt)

         //create user
         const user=await User.create({
            name,
            email,
            password:hashPW
         })
         res.status(201).json({message:"User registers succsessfully"})
    } catch (error) {
        res.status(500).json({message:"internal server error"})
    }
}


export const loginUser=async(req,res)=>{
   try {
     const{email,password}=req.body
     if(!email || !password){
        return res.status(400).json({message:"All fields are required"})
     }
     const user=await User.findOne({email})
     if(!user){
        return res.status(400).json({message:"User not exists"})
     }

     const pwMatch=await bcryptjs.compare(password,user.password)
     if(!pwMatch){
        return res.status(400).json({message:"password not match"})
     }

     const token=jwt.sign({userId:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
     )

      sendEmail({
      to: user.email,
      subject: "Login Alert - Notes App",
      html: `
        <h2>Hello ${user.name},</h2>
        <p>You have logged in successfully.</p>
        <p><b>Date:</b> ${new Date().toLocaleString()}</p>
        <p>If this wasn't you, please reset your password.</p>
      `,
    }).catch(err => console.error("Email error:", err));

     res.status(200).json({
        token,
           user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
     })

   } catch (error) {
     res.status(500).json({ message: "Server error" });
   }

}