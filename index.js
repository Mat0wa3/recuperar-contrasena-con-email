import express from 'express'
import 'dotenv/config'
const PORT = process.env.PORT
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('<h1>ESTAS EN LA RUTA RAIZ</h1>')
})

app.listen(PORT, () => {
    console.log(`bgfbgfbgfgb iniciado en: http://localhost:${PORT}`)
})