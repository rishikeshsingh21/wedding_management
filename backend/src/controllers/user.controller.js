import  User  from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import passwordResetEmailHTML from "../utils/PasswordResetEmailHtml.js";
import sendEmail from "../utils/SendEmail.js";
import crypto from "crypto"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = async (userId) => {
    try{
        const user = await User.findById(userId)

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        
        user.refreshToken = refreshToken

        await user.save({validateBeforeSave:false});

        return {
            accessToken,
            refreshToken
        }
    }catch(err){
        throw new ApiError(
            500,
            err.message,
            "Error while generating Access and Refresh Token",
            err
        )
    }
}

const registerUser = AsyncHandler(async (req, res) => {
    const {name, email, password, phone, role = "couple"} = req.body

    if(
        [name, email, password, phone].some((field) => !field || field?.trim() === "")
    ){
        throw new ApiError(
            422,
            "Unprocessable Entity",
            "All field are required"

        )
    }

    const exitingUser = await User.findOne({
        $or:[{email},{phone}]
    })
    //console.log(exitingUser)
    if(exitingUser){
        throw new ApiError(
            409,
            "Conflict user exists",
            "User already exits"
        ) 
    }

    try{
        
        const user = await User.create({
            name,
            email,
            password,
            phone,
            role
        })

        const createdUser = await User.findById(user._id).select("-password -refreshToken")

        if(!createdUser){
            throw new ApiError(
                500,
                "Internal server error",
                "Can't find the created user"
            )
        }

        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    {
                        user:createdUser
                    },
                    "User created Successfully"
                )
            )
    }catch(err){
        //handle race condition db error
        if(err.code === 11000){
            throw new ApiError(
                409,
                "User already exits mongodb"
            )
        }
        throw err
    }
})

const loginUser = AsyncHandler( async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
        throw new ApiError(
            422,
            "MobileNo and password required!",
            "Unprocessable Entity"
        )
    }

    const existingUser = await User.findOne({email})

    if(!existingUser){
        throw new ApiError(
            401,
            "Invalid credentials",
            "Register yourself"
        )
    }  
    const isMatch = await existingUser.isPasswordCorrect(password)
    if(!isMatch){
        throw new ApiError(
            401,
            "Invalid credentials",
            "Authentication failed"
        )
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(existingUser._id)
    console.log("accessToken:",accessToken);

    const safeUser = existingUser.toObject()
    delete safeUser.password
    delete safeUser.refreshToken

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge:7*24*60*60*1000
    }

    return res
        .status(200)
        .cookie("refreshToken",refreshToken,options)
        .json(
            new ApiResponse(
                201,
                {
                    user:safeUser,
                    accessToken:accessToken
                },
                "User logedIn successfully"
            )
        )

})

const logoutUser = AsyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: { refreshToken: 1 }
        }
    )

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict"
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200,
                {},
                "User logged out successfully"
            )
        )
})


const forgotPassword = AsyncHandler(async (req,res) => {
    const {email} = req.body
    const user = await User.findOne({email})

    if(!user){
        res.status(404).json(
            new ApiError(
                404,
                [],
                "User not found"
            )
        )
    }

    const resetToken = user.generatePasswordResetToken();
    console.log("ResetToken",resetToken)

    await user.save({ validateBeforeSave: false })  

    const resetUrl = `${process.env.CORS_ORIGIN}/reset-password/${resetToken}`

    try{
        await sendEmail({
            to: user.email,
            subject:"Reset-password",
            html: passwordResetEmailHTML(resetUrl, user.name)
        })
        res.status(200).json(
            new ApiResponse(
                200,
                [],
                "Reset link send to the email"
            )
        )
    }catch(err){
        user.resetPasswordToken = undefined 
        user.resetPasswordTokenExpiry = undefined

        await user.save({ validateBeforeSave: false })

        throw new ApiError(500, "Email could not be sent")
    }
})

const resetPassword = AsyncHandler(async (req,res) =>{
    try{
        const {newPassword, confirmPassword} = req.body
        const token = req.params.token.trim();

        if(!token || !newPassword || !confirmPassword){
            return res.status(400).json(
                new ApiResponse(
                    400,
                    [],
                    "All fields are required"
                )
            )
        }

        if(newPassword != confirmPassword){
            return res.status(400).json(
                new ApiResponse(
                    400,
                    [],
                    "Password do not match"
                )
            )
        }
        
        const hashRestToken = crypto.createHash("sha256").update(token).digest("hex")
        //console.log("hashRestToken:2",hashRestToken)

        const user = await User.findOne({
            resetPasswordToken: hashRestToken,
            resetPasswordTokenExpiry:{ $gt:Date.now() }
        })
        //console.log(user)
        if(!user){
            return res.status(400).json(
                new ApiResponse(
                    400,
                    [],
                    "Invalid or expire token"
                )
            )
        }

        user.password = newPassword
        user.resetPasswordToken = undefined
        user.resetPasswordTokenExpiry = undefined


        await user.save()

        res.status(200).json(
            new ApiResponse(
                200,
                [],
                "Password reset successfully"
            )
        )

    }catch(err){
        console.error(err);
        res.status(500).json(
            new ApiError(
                500,
                "Internal Server Error"
            )
        );
    }
})

const getUser = AsyncHandler(async (req,res) => {
    const userId = req.user._id;

    const user = await User.findById(userId).select("-password -refreshToken -resetPasswordToken -resetPasswordTokenExpiry");

    if(!user){
        return res.status(404).json(
            new ApiError(
                404,
                [],
                "User not found"
            )
        )
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "User fetched successfully"
        )
    )
})

const refreshAccessToken = AsyncHandler(async (req,res) =>{
    try {
    const refreshTokenCookie =
      req.cookies?.refreshToken || req.body.refreshToken;

    
    if (!refreshTokenCookie) {
      throw new ApiError(401, "Refresh token missing");
    }

    const decoded = jwt.verify(
      refreshTokenCookie,
      process.env.REFRESH_TOKEN_SECRET
    );

    console.log("decoded", decoded)

    const user = await User.findById(decoded._id);
    
    if (!user || user.refreshToken !== refreshTokenCookie) {
      throw new ApiError(403, "Invalid refresh token");
    }
    console.log(user)
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7*24*60*60*1000
    }
    
    return res
      .cookie("refreshToken", refreshToken, options)
      .status(200)
      .json(
        new ApiResponse(
            200,
            {
                accessToken: accessToken
            },
            "accessToken refesh sucessfully"
        )
      );

  } catch (error) {
    throw new ApiError(
        401,
        "Refresh token expired or invalid: Login to renew"
    )
  }
})

export {
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getUser,
    refreshAccessToken
}