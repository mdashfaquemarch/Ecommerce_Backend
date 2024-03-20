import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js"
import ApiError from '../utils/ApiError.js'

const register = asyncHandler( async (req,res) => {
    // get data from user
    // validate that data
    // check if user is existed or not
    // get local path of avatar 
    // upload to cloudinary
    // create user in db
    // remove password and refresh token from user
    // check if user is created or not
    // return response


   const { fullName, email, password, avatar, gender, dob} = req.body;

    if([fullName,email,password,avatar,gender,dob].some((feild) => feild?.trim() === "")) {
        throw new ApiError(400,"All fields are required!");
    }


})