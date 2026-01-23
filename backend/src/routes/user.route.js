import { Router } from "express";
import { forgotPassword, getUser, loginUser, logoutUser, refreshAccessToken, registerUser, resetPassword } from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router()

//public routes
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/forgot-password").post(forgotPassword)
router.route("/reset-password/:token").post(resetPassword)
router.route("/refresh-access-token").post(refreshAccessToken)

//protected route
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/me").get(verifyJWT,getUser)

export default router