import { generateVerificationCode, sendVerificationEmail } from "../Utils/codeGenerator.js"
import UserModel from "../models/UserModel.js"
import bcrypt from "bcrypt"

const userModel = new UserModel()

export default class RegisterController {
    async register(req, res) {
        const { email, name, last_name, password, confirmedPassword } = req.body
        if (!email || !name || !last_name || !password) throw new Error("Todos los campos son obligatorios")
        if (password !== confirmedPassword) throw new Error("Las contraseñas no coinciden")
        if (password.length < 6) throw new Error("La contraseña debe tener al menos 6 caracteres")
        
        const userExists = await userModel.getByEmail(email)
        if (userExists) throw new Error("El usuario ya existe")

        try {
            const code = generateVerificationCode()
            await sendVerificationEmail(email, code)
            userModel.register({ email, name, last_name, password, confirmedPassword }, code)
            res.status(201).send({ message: "Usuario registrado correctamente. Revisa tu correo para el código de verificación." })
        } catch (error) {
            console.error("Error al registrar usuario:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }

    async verify(req, res) {
        const { email, code } = req.body
        try {
            const [user] = await userModel.getUnverifiedUserByEmail(email)
            if (!user) {
                return res.status(404).send({ message: "Usuario no encontrado" })
            }
            if (user.verificationCode !== code) {
                return res.status(400).send({ message: "Código de verificación incorrecto" })
            }
            await userModel.create({ userID: user.userID, name: user.name, last_name: user.last_name, email: user.email, password: user.password })
            res.status(200).send({ message: "Cuenta verificada correctamente" })
        } catch (error) {
            console.error("Error al verificar usuario:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }

    async login(req, res) {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).send({ message: "Email y contraseña son obligatorios" })
        }

        try {
            const user = await userModel.getByEmail(email)
            if (!user) {
                return res.status(404).send({ message: "Usuario no encontrado" })
            }

            const comparedPassword = await bcrypt.compare(password, user.password)
            if (!comparedPassword) return res.status(401).send({ message: "Contraseña incorrecta" })

            res.status(200).send({ message: "Inicio de sesión exitoso", user })
        } catch (error) {
            console.error("Error al iniciar sesión:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }

    async forgotPassword(req, res) {
        const { email } = req.body

        if (!email) {
            return res.status(400).send({ message: "Email es obligatorio" })
        }

        try {
            const user = await userModel.getByEmail(email)
            if (!user) {
                return res.status(404).send({ message: "Usuario no encontrado" })
            }

            const code = generateVerificationCode()
            await sendVerificationEmail(email, code)

            res.status(200).send({ message: "Código de verificación enviado al correo electrónico" })
        } catch (error) {
            console.error("Error al enviar el código de verificación:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }

    async resetPassword(req, res) {
        const { email, newPassword } = req.body

        if (!email || !newPassword) {
            return res.status(400).send({ message: "Email y nueva contraseña son obligatorios" })
        }

        try {
            const user = await userModel.getByEmail(email)
            if (!user) {
                return res.status(404).send({ message: "Usuario no encontrado" })
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10)
            await userModel.updatePassword(user.userID, hashedPassword)

            res.status(200).send({ message: "Contraseña actualizada correctamente" })
        } catch (error) {
            console.error("Error al actualizar la contraseña:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }
}