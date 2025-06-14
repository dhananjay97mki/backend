import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary URL
      required: true,
    },
    coverImage: {
      type: String, // cloudinary URL
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next)  {
  if (!this.isModified("password")) return next();
  /*if (this.isModified("password"))*/
    this.password = await bcrypt.hash(this.password, 10);
  next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};  

userSchema.methods.generateAccessoken = function () {
  jwt.sign(
    { 
      id: this._id, 
      email: this.email,
      fullName: this.fullName,
      username: this.username 
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      // "1h"  // Uncomment this line if you want to set a fixed expiry time
      // "1h"  // Uncomment this line if you want to set a fixed expiry time  
     } // Token expires in 1 hour
  );      
  
};  

userSchema.methods.generateRefreshToken = function () {
  jwt.sign(
    { 
      id: this._id, 
    },
    process.env.REFRESH_TOKEN_SECRET,
    { 
      expiresIn: process.env.AREFRESH_TOKEN_EXPIRY
     } 
  );      
}       

export default mongoose.model("User", userSchema);
// This model defines the structure of a User document in MongoDB using Mongoose.   
// It includes fields for username, email, fullname, avatar, coverImage, watchHistory, password, and refreshToken.