import jwt from "jsonwebtoken";
const JWT_SECRET= "secret123";

const authMiddleware = (req,res,next)=>{
    const authHeader =req.headers.authorization;
     //  check if authHeader exists and starts with Bearer
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({message:"Unauthorized"});
    }
 // extract token from header
const token = authHeader.split(" ")[1];
try{
    const decoded =jwt.verify(token,JWT_SECRET); // verify token
    req.userId = decoded.id;    // attach userId to request object
    next();
}catch(error){
    res.status(401).json({message:"Invalid token"});
}
}

export default authMiddleware;