import express from "express";
import {upload} from "../middlewares/multer.middleware.js"
import {adminOnly} from "../middlewares/auth.middleware.js"

import { getAllUser, registerUser , getUser, deleteUser } from "../controllers/user.controller.js";
const router  = express.Router();


// route - /api/v1/user/new
router.route("/new").post(upload.single('avatar'),registerUser);
router.route("/:userId").get(getUser)




// protected routes

// route - /api/v1/user/all
router.route("/all").get(adminOnly,getAllUser)

// route - /api/v1/user/dynamicId
router.route("/:userId").delete(adminOnly,deleteUser)




export default router;