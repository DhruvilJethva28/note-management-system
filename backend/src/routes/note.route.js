import { createNote,updateNote,deleteNote,getNotes } from "../controllers/note.controller.js";
import express from "express"
import protect from "../middleware/auth.middleware.js";
const Noteroute=express.Router()

Noteroute.get("/",protect,getNotes)
Noteroute.post("/",protect,createNote)
Noteroute.put("/:id", protect, updateNote);
Noteroute.delete("/:id",protect,deleteNote)

export default Noteroute
