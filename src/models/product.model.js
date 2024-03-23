import mongoose from "mongoose";


const productSchema = new mongoose.Schema(
    {
       productName: {
          type: String,
          required: [true, "Please Enter Product Name"],
          trim: true
       },
       productImage: {
          type: String, // cloudinary
          required: [true, "Please Enter Product Image"]
       },
       price: {
        type: Number,
        required: [true, "Please Enter Product Price"]
       },
       stock: {
        type: Number,
        required: [true, "Please Enter Product Stock"],
       },
       category: {
        type: String,
        required: [true, "Please Enter Category"],
        trim: true,
        lowerCase: true
       }
    },
  
    { timestamps: true });


    export const Product = mongoose.model("Product", productSchema);