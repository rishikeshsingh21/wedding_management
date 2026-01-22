import {Router} from "express";
import { createService } from "../controllers/vendor.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";


const router = Router()

router.route("/services/create-service")
.post(verifyJWT,upload.array("images", 5),createService);

export default router