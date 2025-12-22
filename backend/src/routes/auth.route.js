import { registerUser,loginUser } from "../controllers/auth.controller.js";
import express from "express"
const router=express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/test", (req, res) => {
  res.send("Auth routes working");
});

export default router