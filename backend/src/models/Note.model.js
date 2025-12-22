import mongoose from "mongoose";

const noteSchma=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
},{timestamps:true})

const Note=mongoose.model("Note",noteSchma)
export default Note