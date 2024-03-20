import express from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { registerUser } from "../controllers/user.controller.js";
const router  = express.Router();


// route - /api/v1/user
router.route("/new").post(upload.single('avatar'),registerUser)


export default router;