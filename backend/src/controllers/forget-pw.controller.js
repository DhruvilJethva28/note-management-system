import User from "../models/User.model.js"
import bcrypt from "bcryptjs"
import sendEmail from "../utils/sendEmail.utils.js"

export const forgetpw = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "user with email is not exist" })
        }


        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedOTP = await bcrypt.hash(otp, 10)
        user.resetOTP = hashedOTP
        user.resetOTPExpiry = Date.now() + 10 * 60 * 1000

        await user.save()
        // await sendEmail(
        //     email,
        //     "password reset otp",
        //     `your otp is ${otp} expires in 10 minutes`
        // )
        return res.status(200).json({
            message: "OTP generated",
            otp // TEMP: for debugging
        });


        return res.status(200).json({ message: "otp send " })
    } catch (error) {
        res.status(500).json({ message: "server error" })
    }
}