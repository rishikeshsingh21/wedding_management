import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";

const verifyJWT = AsyncHandler(async(req,res,next)=>{

    const authHeader = req.headers.authorization;
    //console.log("authHeader",authHeader)
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, "Not authorized, token missing");
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    
    try{
        //console.log("Token",token)
        decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        console.log("Decoded Token",decoded)
    }catch(err){
        res.status(401);
        throw new ApiError("Not authorized, token failed",err.message);
    }

    const user = await User.findById(decoded._id).select("-password -refreshToken");
    console.log(user);
    if(!user){
        res.status(401);
        throw new ApiError("Not authorized, user not found");
    }

    req.user = user;
    next();
})

export default verifyJWT;