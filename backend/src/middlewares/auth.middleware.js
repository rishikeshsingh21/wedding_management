import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";

const verifyJWT = AsyncHandler(async(req,res,next)=>{

    const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
    //console.log("Token from middleware:",token);
    if(!token){
        res.status(401);
        throw new ApiError("Not authorized, no token");
    }

    let decoded;
    
    try{
        decoded = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        //console.log("Decoded Token",decoded)
    }catch(err){
        res.status(401);
        throw new ApiError("Not authorized, token failed");
    }

    const user = await User.findById(decoded._id).select("-password -refreshToken");

    if(!user){
        res.status(401);
        throw new ApiError("Not authorized, user not found");
    }

    req.user = user;
    next();
})

export default verifyJWT;