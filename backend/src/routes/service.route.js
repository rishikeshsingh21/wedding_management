import {Router} from "express"
import { getServicesByCategory } from "../controllers/service.controller.js";

const router = Router();

router.route("/category").get(getServicesByCategory);

export default router