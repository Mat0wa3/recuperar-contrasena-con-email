import UserModel from "../models/UserModel.js"

export default class UserController {
    static async getAll(req, res) {
        try {
            const users = await UserModel.getAll()
            res.status(200).send(users)
        } catch (error) {
            console.error("Error al obtener usuarios:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }

    static async getById(req, res) {
        const { userID } = req.params
        try {
            const user = await UserModel.getById(userID)
            res.status(200).send(user)
        } catch(error) {
            console.error("Error al obtener usuario por ID:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }

    static async create(req, res) {
        try {
            const user = await UserModel.create(req.body)
            res.status(201).send(user)
        } catch (error) {
            console.error("Error al crear usuario:", error.message)
            res.status(500).send({ message: 'Interal server error' })
        }
    }

    static async delete(req, res) {
        const { userID } = req.params
        try {
            const result = await UserModel.detele(userID)
            res.status(200).send(result)
        } catch (error) {
            console.error("Error al eliminar usuario:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }

    static async update(req, res) {
        const { userID } = req.params
        try {
            await UserModel.update(userID, req.body)
            res.status(200).send({ message: "Usuario actualizado correctamente"})
        } catch (error) {
            console.error("Error al actualizar usuario:", error)
            res.status(500).send({ message: "Internal server error" })
        }
    }
}