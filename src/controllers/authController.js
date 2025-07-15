import { generateVerificationCode, sendVerificationEmail } from "../Utils/codeGenerator.js"

import jwt from "jsonwebtoken"
import UserModel from "../models/UserModel.js"
import bcrypt from "bcrypt"

export function generateToken(user, code) {
    if (code) return jwt.sign({ userID: user.userID, email: user.email, code: code }, process.env.JWT_SECRET, { expiresIn: '1h' })
    return jwt.sign({ userID: user.userID, email: user.email, name: user.name, last_name: user.last_name }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

export default class RegisterController {
    static async register(req, res) {
        const { email, name, last_name, password } = req.body
        const code = generateVerificationCode()
        sendVerificationEmail(email, code, "Por favor, ingresa este código en la aplicación para completar el registro.").catch(error => console.error("Error al enviar el correo de verificación: ", error.message))
        
        try {
            const user = await UserModel.create({ email, name, last_name, password })
            const token = generateToken(user, code)
            res
            .status(201)
            .cookie("register_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
                maxAge: 60 * 60 * 1000 // 1 hour
            })
            .send({ message: "Usuario registrado correctamente. Revisa tu correo para el código de verificación." })
        } catch (error) {
            console.error("Error al registrar usuario:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body
        const user = await UserModel.getByEmail(email)
        if (!user) return res.status(404).send({ message: "User not found" })
        if (user.disabled === 1) return res.status(401).send({ message: "User not enabled" })

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) return res.status(401).send({ message: "Invalid password" })
        if (user.disabled === 1) return res.status(403).send({ message: "User is disabled. Please verify your email." })

        const token = generateToken(user)

        try {
            res
            .status(200)
            .cookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
                maxAge: 60 * 60 * 1000
            })
            .send({ user, token })
        } catch (error) {
            console.error("Error al iniciar sesión:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }

    static async logout(req, res) {
        try {
            res.clearCookie("access_token").status(200).send({ message: "Logged out successfully" })
        } catch (error) {
            console.error("Error al cerrar sesión:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }

    static async verify(req, res) {
        const { email, code } = req.body
        const token = req.cookies.register_token
        const user = await UserModel.getByEmail(email)
        const { userID } = user

        if (!token) return res.status(401).send({ message: "Token not provided" })

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            if (decoded.code !== code) return res.status(400).send({ message: "Invalid verification code" })

            await UserModel.update(userID, { disabled: 0 })
            res.clearCookie("register_token").status(200).send({ message: "Email verified successfully" })
        } catch (error) {
            console.error("Error al verificar el correo:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }
}