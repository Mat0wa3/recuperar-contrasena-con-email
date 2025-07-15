import { Router } from 'express'
import { verifyToken } from '../middleware/authMiddleware.js'

import path from 'path'

const router = Router()
const viewsPath = path.resolve('src/views')

router.get('/', (req, res) => {
    res.sendFile(path.join(viewsPath, 'login.html'))
})

router.get('/register', (req, res) => {
    res.sendFile(path.join(viewsPath, 'user-register.html'))
})

router.get('/verify-email', (req, res) => {
    res.sendFile(path.join(viewsPath, 'usuarios/verify-email.html'))
})

router.get('/verify-success', (req, res) => {
    res.sendFile(path.join(viewsPath, 'usuarios/verify-success.html'))
})

router.get('/reset-password', (req, res) => {
    res.sendFile(path.join(viewsPath, 'usuarios/reset-password.html'))
})

router.get('/forgot-password', (req, res) => {
    res.sendFile(path.join(viewsPath, 'usuarios/forgot-password.html'))
})

router.get('/recovery-code', (req, res) => {
    res.sendFile(path.join(viewsPath, 'usuarios/recovery-code.html'))
})

router.get('/new-password', (req, res) => {
    res.sendFile(path.join(viewsPath, 'usuarios/new-password.html'))
})

router.get('/usuarios/panel', verifyToken, (req, res) => {
    res.sendFile(path.join(viewsPath, 'usuarios/index.html'))
})

router.get('/productos/panel', verifyToken, (req, res) => {
    res.sendFile(path.join(viewsPath, 'productos/index.html'))
})

export default router