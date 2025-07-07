import ProductModel from "../models/ProductModel.js"

const productModel = new ProductModel()

export default class ProductController {
    async getAll(req, res) {
        try {
            const products = await productModel.getAll()
            res.status(200).send(products)
        } catch (error) {
            console.error("Error al obtener productos:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }

    async getById(req, res) {
        const { productID } = req.params
        try {
            const product = await productModel.getById(productID)
            if (!product) {
                return res.status(404).send({ message: "Producto no encontrado" })
            }
            res.status(200).send(product)
        } catch (error) {
            console.error("Error al obtener producto:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }

    async create(req, res) {
        try {
            const product = await productModel.create(req.body)
            res.status(201).send(product)
        } catch (error) {
            console.error("Error al crear producto:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }

    async delete(req, res) {
        const { productID } = req.params
        try {
            const result = await productModel.detele(productID)
            res.status(200).send(result)
        } catch (error) {
            console.error("Error al eliminar producto:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }

    async update(req, res) {
        const { productID } = req.params
        try {
            const updatedProduct = await productModel.update(productID, req.body)
            res.status(200).send({ message: "Producto actualizado correctamente", product: updatedProduct })
        } catch (error) {
            console.error("Error al actualizar producto:", error.message)
            res.status(500).send({ message: "Internal server error" })
        }
    }
}