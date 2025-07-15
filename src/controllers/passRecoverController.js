import { generateVerificationCode, sendVerificationEmail } from "../Utils/codeGenerator.js"
import { generateToken } from "./authController.js"

import jwt from "jsonwebtoken"
import UserModel from "../models/UserModel.js"

export default class passRecoverController {
    static async forgotPassword(req, res) {
        const { email } = req.body
        const user = await UserModel.getByEmail(email)
        if (!user) return res.status(404).send({ message: "User not found" })

        const code = generateVerificationCode()
        sendVerificationEmail(email, code, "Por favor, ingresa este código en la aplicación para restablecer tu contraseña.").catch(error => console.error("Error al enviar el correo de verificación: ", error.message))

        try {
            const token = generateToken(user, code)
            res
            .status(200)
            .cookie("forgot_password_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
                maxAge: 60 * 60 * 1000 // 1 hour
            })
            .send({ message: "Código de verificación enviado al correo electrónico." })
        } catch (error) {
            console.error("Error al enviar el código de verificación:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }

    static recoveryCode(req, res) {
        const { code } = req.body
        const token = req.cookies.forgot_password_token

        if (!token) return res.status(401).send({ message: "Token not provided" })
            
            try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            if (decoded.code !== code) return res.status(400).send({ message: "Invalid verification code" })

            res.status(200).send({ message: "Código de verificación válido. Puedes restablecer tu contraseña." })
        } catch (error) {
            console.error("Error al verificar el código de recuperación:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }

    static async resetPassword(req, res) {
        const { password } = req.body
        const token = req.cookies.forgot_password_token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const email = decoded.email
        const user = await UserModel.getByEmail(email)
        if (!user) return res.status(404).send({ message: "User not found" })

        try {
            await UserModel.update(user.userID, { password: password })
            res.status(200).clearCookie("forgot_password_token").send({ message: "Password reset successfully" })
        } catch (error) {
            console.error("Error al restablecer la contraseña:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }
}