import { Router } from "express";
import { forgotPassword, getUser, loginUser, logoutUser, registerUser, resetPassword } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password/:token").post(resetPassword)

//protected route
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/me").get(verifyJWT,getUser)

export default router