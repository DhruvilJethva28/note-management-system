import bcrypt from "bcryptjs";
import User from "../models/User.model.js"

export const resetPW = async (req, res) => {
    try {
    const { email, newPassword } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const hashPW=await bcrypt.hash(newPassword,10)
      user.password = hashedPassword;
  user.resetOTP = undefined;
  user.resetOTPExpiry = undefined;
  await user.save()
  
  res.json({ message: "Password reset successful" });
} catch (error) {
 return res.status(500).json({ message: "internal server error" });
}
}