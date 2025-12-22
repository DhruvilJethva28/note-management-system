import jwt from "jsonwebtoken";
const protect=async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token=req.headers.authorization.split(" ")[1]
            const decod=jwt.verify(token,process.env.JWT_SECRET)
            req.userId=decod.userId;
            next();
        }
        catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
    }
     if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

}
export default protect