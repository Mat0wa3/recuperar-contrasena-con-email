import db from './DATABASE.js'

export default class UserModel {
    static async getAll() {
        const [rows] = await db.query("SELECT BIN_TO_UUID(productID) productID, product, category, price, stock FROM products;")
        return rows
    }

    static async getById(productID) {
        const [rows] = await db.query("SELECT BIN_TO_UUID(productID) productID, product, category, price, stock FROM products WHERE productID = UUID_TO_BIN(?);", [productID])
        return rows[0]
    }

    static async create(input) {
        const { product, category, price, stock } = input
        if (!product || !category || !price || !stock) throw new Error("Todos los campos son obligatorios")
        const [existingProduct] = await db.query("SELECT * FROM products WHERE product = ?;", [product])
        if (existingProduct.length > 0) throw new Error("El producto ya existe")
        const productID = await db.query("SELECT UUID() productID;")

        await db.query("INSERT INTO products VALUES(?, ?, ?, ?, ?, 0);", [productID, product, category, price, stock])

        return {
            productID,
            product,
            category,
            price,
            stock
        }
    }

    static async detele(productID) {
        await db.query("Update products SET disabled = 1 WHERE productID = UUID_TO_BIN(?);", [productID])
        return { message: "Producto eliminado correctamente" }
    }

    static async update(productID, input) {
        const { product, category, price, stock } = input
        if (!product || !category || !price || !stock) throw new Error("Todos los campos son obligatorios")

        await db.query("UPDATE products SET product = ?, category = ?, price = ?, stock = ? WHERE productID = UUID_TO_BIN(?);", [product, category, price, stock, productID])

        const [updatedProduct] = await db.query("SELECT BIN_TO_UUID(productID) productID FROM products WHERE productID = UUID_TO_BIN(?);", [productID])

        return updatedProduct[0]
    }
}