import { Router } from "express"
import AuthController from "../controllers/authController.js"

const authController = new AuthController()
const router = Router()

router.post("/register", authController.register)
router.post("/verify", authController.verify)
router.post("/login", authController.login)
router.post("/reset-password", authController.resetPassword)
router.post("/forgot-password", authController.forgotPassword)

export default router