import { Router } from "express"

import passRecoverController from "../controllers/passRecoverController.js"

const router = Router()

router.post("/forgot-password", passRecoverController.forgotPassword)
router.post("/reset-password", passRecoverController.resetPassword)
router.post("/recovery-code", passRecoverController.recoveryCode)

export default router