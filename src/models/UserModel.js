import db from './DATABASE.js'
import bcrypt from 'bcrypt'

const { SALT } = process.env

export default class UserModel {
    static async getAll() {
        const [rows] = await db.query("SELECT BIN_TO_UUID(userID) userID, name, last_name, email, disabled FROM users;")
        return rows
    }

    static async getByEmail(email) {
        const [rows] = await db.query("SELECT BIN_TO_UUID(userID) userID, name, last_name, email, password, disabled FROM users WHERE email = ?;", [email])
        return rows[0]
    }

    static async getById(userID) {
        const [rows] = await db.query("SELECT BIN_TO_UUID(userID) userID, name, last_name, email, disabled FROM users WHERE userID = UUID_TO_BIN(?);", [userID])
        return rows[0]
    }

    static async create(input) {
        const { email, name, last_name, password } = input
        if (!email || !name || !password) throw new Error("Todos los campos son obligatorios")
        if (password.length < 6) throw new Error("La contraseña debe tener al menos 6 caracteres")
        
        const [uuidResult] = await db.query("SELECT UUID() userID;")
        const [{ userID }] = uuidResult

        const hashedPassword = await bcrypt.hash(password, parseInt(SALT))

        await db.query("INSERT INTO users (userID, name, last_name, email, password) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?);", [userID, name, last_name, email, hashedPassword])

        return { userID }
    }

    static async detele(userID) {
        await db.query("Update users SET disabled = 1 WHERE userID = UUID_TO_BIN(?);", [userID])
        return { message: "Usuario eliminado correctamente" }
    }

    static async update(userID, input) {
        const keys = Object.keys(input)
        const values = Object.values(input)

        if (keys.includes('password')) {
            const index = keys.indexOf('password');
            values[index] = await bcrypt.hash(values[index], parseInt(SALT));
        }

        const setClause = keys.map(key => `${key} = ?`).join(", ")

        return await db.query(`UPDATE users SET ${setClause} WHERE userID = UUID_TO_BIN(?);`, [...values, userID])
    }
}