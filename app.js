import express from 'express'
import 'dotenv/config'
import path from 'path'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

import userRoutes from './src/routes/userRoutes.js'
import productRoutes from './src/routes/productRoutes.js'
import authRoutes from './src/routes/authRoutes.js'
import webRoutes from './src/routes/webRoutes.js'
import passRecoverRoutes from './src/routes/passRecoverRouter.js'
import cors from 'cors'

const PORT = process.env.PORT
const app = express()
const __dirname = path.resolve()

app.use(express.json())
app.use(express.static(path.join(__dirname, "src")))
app.use(morgan('dev'))
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/recovery', passRecoverRoutes)
app.use('/', webRoutes)

process.on('uncaughtException', (err) => {
    console.error('¡Excepción no capturada!', err)
})

process.on('unhandledRejection', (reason, promise) => {
    console.error('¡Promesa rechazada no capturada!', reason)
})

app.listen(PORT, () => {
    console.log(`servidor iniciado en: http://localhost:${PORT}`)
})