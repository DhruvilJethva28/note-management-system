console.log("AUTH ROUTES FILE LOADED");


import { registerUser,loginUser } from "../controllers/auth.controller.js";
import { forgetpw } from "../controllers/forget-pw.controller.js";
import { verifyOTP } from "../controllers/verifyotp.controller.js";
import { resetPW } from "../controllers/resetpw.controller.js";
import express from "express"
const router=express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/forgot-password",forgetpw)
router.post("/verify-otp",verifyOTP)
router.post("/reset-password",resetPW)


router.get("/test-forgot", (req, res) => {
  res.send("Forgot password route works");
});

router.get("/test", (req, res) => {
  res.send("Auth routes working");
});

export default router