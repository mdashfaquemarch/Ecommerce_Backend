import express from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { getAllUser, registerUser , getUser, deleteUser } from "../controllers/user.controller.js";
const router  = express.Router();


// route - /api/v1/user/new
router.route("/new").post(upload.single('avatar'),registerUser);

// route - /api/v1/user/all
router.route("/all").get(getAllUser)

// route - /api/v1/user/dynamicId
router.route("/:userId").get(getUser).delete(deleteUser)


export default router;