import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req, res) => {
    // get data from user
    // validate that data
    // check if user is existed or not
    // get local path of avatar 
    // upload to cloudinary
    // create user in db
    // remove password and refresh token from user
    // check if user is created or not
    // return response


    const { fullName, email, password, gender, dob } = req.body;

    if ([fullName, email, password, gender, dob].some((feild) => feild?.trim() === "")) {
        throw new ApiError(400, "All fields are required!");
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
        throw new ApiError(409, "User with email already exists")
    }

    /* console.log(req.file);
      output:
      {
        fieldname: 'avatar',
        originalname: 'lion.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: './public/temp',
        filename: 'lion.jpg',
        path: 'public\\temp\\lion.jpg',
        size: 5414
 }
    */
    const avatarLocalPath = req.file?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required")
    }

    const user = await User.create({
        fullName,
        email,
        password,
        gender,
        dob:new Date(dob),  // req.body gives string 
        avatar:avatar?.url
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError(500,"Error while Registering the user");
    }

    res.
    status(201).
    json(new ApiResponse(200,createdUser,"User registered Successfully"));
})


export {
    registerUser,
}