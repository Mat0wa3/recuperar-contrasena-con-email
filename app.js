import express from 'express'
import 'dotenv/config'
import path from 'path'
import userRoutes from './src/routes/userRoutes.js'
import productRoutes from './src/routes/productRoutes.js'
import authRoutes from './src/routes/authRoutes.js'

const PORT = process.env.PORT
const app = express()
const __dirname = path.resolve()

app.use(express.json())
app.use(express.static(path.join(__dirname, "src")))

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)

app.get('/', (req, res) => {
    res.sendFile('/src/views/login.html', { root: '.' })
})

app.get('/register', (req, res) => {
    res.sendFile('/src/views/user-register.html', { root: '.' })
})

app.listen(PORT, () => {
    console.log(`servidor iniciado en: http://localhost:${PORT}`)
})