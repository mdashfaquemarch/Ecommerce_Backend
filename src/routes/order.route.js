import express from 'express'

import {adminOnly}  from "../middlewares/auth.middleware.js"
import { newOrder } from '../controllers/order.controller.js';

const router = express.Router();





router.route("/new-order").post(newOrder)






export default router;