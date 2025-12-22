import Note from "../models/Note.model.js";

// export const getNotes=async(req,res)=>{
//     try {
//         const{title,content}=req.body
//         const note=await Note.findOne({_id:req.params.id,user:req,userId})
//         if(!note){
//              return res.status(400).json({message:"not doesnt exist "})
//         }
//         return res.status(200).json(note)
        
//     } catch (error) {
//          return res.status(500).json({message:"internal server error"})
//     }
// }
export const getNotes = async (req, res) => {
  try {
    console.log("USER ID FROM MIDDLEWARE:", req.userId);

    const notes = await Note.find({ user: req.userId }).sort({ createdAt: -1 });

    console.log("NOTES FOUND:", notes);

    res.status(200).json(notes);
  } catch (error) {
    console.error("GET NOTES ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




export const createNote=async(req,res)=>{
   try {
     const{title,content}=req.body
     if(!content){
         return res.status(400).json({message:"content is required"})
 
     }
     const note=await Note.create({
         title,content,
         user:req.userId
     })
     return res.status(200).json({message:"Note create sucsessfully"})
   } catch (error) {
    return res.status(500).json({message:"internal server error"})
   }

}

export const updateNote=async(req,res)=>{
   try {
     const{title,content}=req.body
     const note=await Note.findOne({
         _id:req.params.id,
         user:req.userId
     })
     if(!note){
         return res.status(400).json({message:"not doesnt exist "})
     }
     note.title=title??note.title
     note.content=content??note.content
 
     const updatenote=await note.save()
     return res.status(200).json(updatenote)
   } catch (error) {
    return res.status(500).json({message:"internal server error"})
   }
}


export const deleteNote=async(req,res)=>{
    try {
        const{title,content}=req.body
        const note=await Note.findOne({_id:req.params.id,user:req.usrId})
        if(!note){
            return res.status(400).json({message:"note is not exist"})
        }
       await note.deleteOne()
       return res.status(200).json({message:"Note delete successfully"})
    } catch (error) {
        return res.status(500).json({message:"internal server error"})
    }
}