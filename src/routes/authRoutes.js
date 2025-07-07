import { Router } from "express"
import AuthController from "../controllers/authController.js"

const authController = new AuthController()
const router = Router()

router.post("/register", authController.register)
router.post("/verify", authController.verify)

export default router