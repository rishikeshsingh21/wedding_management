import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    phone: {
      type: String,
      trim: true,
      unique: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ["couple", "vendor", "admin"],
      default: "couple"
    },

    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    googleId: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    avatar: {
      type: String, //cloudinary URL
      default: "",
    },

    // Vendor specific (future-proof)
    vendorProfile: {
      businessName: String,
      category: String,
      isApproved: {
        type: Boolean,
        default: false,
      },
    },

    refreshToken: {
      type: String
    },

    resetPasswordToken: {
      type:String 
    },

    resetPasswordTokenExpiry: {
      type:Date
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

//before saving to the db hash the password if modified 
userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next

    this.password = await bcrypt.hash(this.password, 10)
    next
})

//check the password is match or not 
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password,this.password)
} 

//generate access token
userSchema.methods.generateAccessToken= function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            name:this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}
userSchema.methods.generateRefreshToken= function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
        }
    )
}

userSchema.methods.generatePasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString("hex");

    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

    this.resetPasswordTokenExpiry = Date.now() + 10 * 60 * 1000; 

    return resetToken;
}


const User = mongoose.model("User", userSchema);

export default User;
