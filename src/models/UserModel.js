import db from './DATABASE.js'

import bcrypt from 'bcrypt'

const { SALT } = process.env

export default class UserModel {
    constructor() {}

    async getAll() {
        const [rows] = await db.query("SELECT BIN_TO_UUID(userID) userID, name, last_name, email, disabled FROM users;")
        return rows
    }

    async getByEmail(email) {
        const [rows] = await db.query("SELECT BIN_TO_UUID(userID) userID, name, last_name, email, password FROM users WHERE email = ?;", [email])
        return rows[0]
    }

    async getById(userID) {
        const [rows] = await db.query("SELECT BIN_TO_UUID(userID) userID, name, last_name, email, disabled FROM users WHERE userID = UUID_TO_BIN(?);", [userID])
        return rows[0]
    }

    async create(input) {
        const { email, name, last_name, password } = input
        if (!email || !name || !last_name || !password) throw new Error("Todos los campos son obligatorios")
        if (password.length < 6) throw new Error("La contraseña debe tener al menos 6 caracteres")
        
        const userExists = await this.getByEmail(email)
        if (userExists) throw new Error("El usuario ya existe")
        
        const [uuidResult] = await db.query("SELECT UUID() userID;")
        const [{ userID }] = uuidResult

        const hashedPassword = await bcrypt.hash(password, parseInt(SALT))

        await db.query("INSERT INTO users (userID, name, last_name, email, password) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?);", [userID, name, last_name, email, hashedPassword])

        return {
            userID,
            name,
            last_name,
            email
        }
    }

    async detele(userID) {
        await db.query("Update users SET disabled = 1 WHERE userID = UUID_TO_BIN(?);", [userID])
        return { message: "Usuario eliminado correctamente" }
    }

    async update(userID, input) {
        const { name, last_name, email } = input
        if (!name || !last_name || !email) throw new Error("Todos los campos son obligatorios")

        await db.query("UPDATE users SET name = ?, last_name = ?, email = ? WHERE userID = UUID_TO_BIN(?);", [name, last_name, email, userID])

        const [updatedUser] = await db.query("SELECT BIN_TO_UUID(userID) userID FROM users WHERE userID = UUID_TO_BIN(?);", [userID])

        return updatedUser[0]
    }
}