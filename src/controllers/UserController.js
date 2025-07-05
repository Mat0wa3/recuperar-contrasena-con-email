import UserModel from "../models/UserModel.js"

const userModel = new UserModel()

export default class UserController {
    constructor() {}

    async getAll(req, res) {
        try {
            const users = await userModel.getAll()
            res.status(200).send(users)
        } catch (error) {
            console.error("Error al obtener usuarios:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }

    async getById(req, res) {
        const { userID } = req.params
        try {
            const user = await userModel.getById(userID)
            res.status(200).send(user)
        } catch(error) {
            console.error("Error al obtener usuario por ID:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }

    async create(req, res) {
        try {
            const user = await userModel.create(req.body)
            res.status(201).send(user)
        } catch (error) {
            console.error("Error al crear usuario:", error.message)
            res.status(500).send({ message: 'Interal server error' })
        }
    }

    async delete(req, res) {
        const { userID } = req.params
        try {
            const result = await userModel.detele(userID)
            res.status(200).send(result)
        } catch (error) {
            console.error("Error al eliminar usuario:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }

    async update(req, res) {
        const { userID } = req.params
        try {
            const updatedUser = await userModel.update(userID, req.body)
            res.status(200).send({ message: "Usuario actualizado correctamente", user: updatedUser })
        } catch (error) {
            console.error("Error al actualizar usuario:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }
}