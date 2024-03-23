import express from "express";
import {adminOnly} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"

import { 
    createNewProduct, deleteProduct, 
    getAdminProducts, getAllCategories,
     getLatestProducts, getSingleProduct, 
     searchProduct, updateProduct }
from "../controllers/product.controller.js";

const router = express.Router();



router.route("/latest").get(getLatestProducts)
router.route("/categories").get(getAllCategories)
router.route("/:productId").get(getSingleProduct)
// search product
router.route("/search").get(searchProduct);


// secured routes



router.route("/new").post(adminOnly, upload.single("productImage"), createNewProduct)

router.route("/admin-products").get(adminOnly, getAdminProducts)

router.route("/:productId")
.patch(adminOnly, upload.single("productImage"), updateProduct)
.delete(adminOnly,deleteProduct);




export default router;