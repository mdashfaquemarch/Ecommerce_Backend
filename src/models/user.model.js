import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: [true, "Please already exist"],
      required: [true, "please enter email"],
      validate: validator.default.isEmail,
      index: true
    },
    password: {
      type: String,
      trim: true,
      required: [true, "please enter password"]
    },
    avatar: {
      type: String, // cloudinary url
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user"
    },
    gender: {
      type: String,
      enum: ["M", "F"],
      required: [true, "Please enter Gender"]
    },
    dob: {
      type: Date,
      required: [true, "Please enter Date of Birth"]
    },
    refreshToken: {
      type: String
    }
  },

  { timestamps: true });

userSchema.virtual('age').get(function () {
  // Calculate age based on current date and user's DOB
  const currentDate = new Date();
  const dobDate = new Date(dob);

  let age = currentDate.getFullYear() - dobDate.getFullYear();
  const dobMonth = dobDate.getMonth();
  const currentMonth = currentDate.getMonth();

  if (currentMonth < dobMonth || (currentMonth === dobMonth && currentDate.getDate() < dobDate.getDate())) {
    age--;
  }

  return age;
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
         {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
         },
         process.env.ACCESS_TOKEN_SECRET,
         {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRY
         }

  )
}

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
          _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn:REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User", userSchema);