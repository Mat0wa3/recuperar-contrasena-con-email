import mysql from "mysql2/promise"
import 'dotenv/config'

const { host, user, database } = process.env

const connection = await mysql.createConnection({
    host: host,
    user: user,
    database: database
})

try {
    const [query] = await connection.query("SELECT BIN_TO_UUID(userID) userID, username, email, password FROM users;")
    console.log(query)
} catch (error) {
    console.error( error.message )
}