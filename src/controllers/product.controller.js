
import { ApiError } from "../utils/ApiError.js"
import {ApiResponse} from '../utils/ApiResponse.js'
import {asyncHandler} from "../utils/asyncHandler.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {Product} from '../models/product.model.js'



// create product

const createNewProduct = asyncHandler ( async (req,res) => {
     const {name,price,stock,category} = req.body

     
     if([name,price,stock,category].some((field) => field.trim() === "")){
         throw new ApiError(400,"All fields are required");
        }

        const  productImageFilePath = req.file?.path

        if(!productImageFilePath) {
            throw new ApiError(400,"Avatar file is required")
        }

        const productImage = await uploadOnCloudinary(productImageFilePath);

        if (!productImage) {
            throw new ApiError(400, "Avatar file is required")
        }

   const product = await Product.create({
            name,
            price,
            stock,
            category,
            productImage: productImage.url
        })

        if(!product) {
            throw new ApiError(500,"Error While uploading the error")
        }

    return res.
    status(201).
    json(new ApiResponse(201,product,"Product created successfully"))
})


// get 10 lastest product

const getLatestProducts = asyncHandler( async (req,res) => {
     const products = await Product.find({}).sort({createdAt: -1}).limit(10);

     if(!products) {
        throw new ApiError(204,"No Products found")
     }

     return res. 
     status(200). 
     json(new ApiResponse(200,products,"Latest products found"))
})


// get all categories


const getAllCategories = asyncHandler(async (req,res) => {
     const categories = await Product.distinct("category");

     return res.
     status(200). 
     json(new ApiResponse(200,categories,"Fetched All categories"))
}) 


// get admin products

const getAdminProducts = asyncHandler(async (req,res) => {
    const products = await Product.find({});

    return res. 
    status(200).
    json(new ApiResponse(200,products,"Fetched All Admin Proudcts"))
})


// get single product

const getSingleProduct = asyncHandler(async (req,res) => {
    const {productId} = req.params;
    const product = await Product.findById(productId);

    return res. 
    status(200).
    json(new ApiResponse(200,product,"Fetched single product"))
})

// update product


const updateProduct = asyncHandler(async(req,res) => {
    const {productId} = req.params;
    
    const {name,price,stock,category} = req.body
      
    const existedProduct = await Product.findById(productId);
      
        if(!existedProduct) {
            throw new ApiError(404," Product Not Found")
        }
        

       const  productImageFilePath = req.file?.path

       if(!productImageFilePath) {
           throw new ApiError(400,"Avatar file is required")
       }

       const productImage = await uploadOnCloudinary(productImageFilePath);

       if (!productImage) {
           throw new ApiError(400, "Avatar file is required")
       }

       if(name) existedProduct.name = name;
       if(price) existedProduct.price = price;
       if(productImage) existedProduct.productImage = productImage;
       if(stock) existedProduct.stock = stock;
       if(category)  existedProduct.category = category;
       
       await existedProduct.save();

   return res.
   status(200).
   json(new ApiResponse(200,existedProduct,"Product Updated successfully"))
})


// delete product


const deleteProduct = asyncHandler(async (req,res) => {
    const {productId} = req.params;
    const product = await Product.findById(productId);
     if(!product) {
        throw new ApiError(404," Product Not Found")
     }

     await product.deleteOne();

    return res. 
    status(200).
    json(new ApiResponse(200,"Product Deleted"))
})


const searchProduct = asyncHandler(async (req,res) => {

})



export {
    createNewProduct,
    getLatestProducts,
    getAllCategories,
    getAdminProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    searchProduct
}