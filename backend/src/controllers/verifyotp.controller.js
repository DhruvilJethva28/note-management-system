import User from "../models/User.model.js"
import bcrypt from "bcryptjs"

export const verifyOTP=async(req,res)=>{
    try {
        const {email,otp}=req.body
        const user=await User.findOne({email})
        if(!user || !user.resetOTP || user.resetOTPExpiry<Date.now()){
            return res.status(400).json({ message: "OTP expired or invalid" })
        }
        const isMatch= await bcrypt.compare(otp,user.resetOTP)
        if(!isMatch){
            return res.status(404).json({message:"otp invalid"})
        }

        res.josn({message:"otp verified"})
    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }
}