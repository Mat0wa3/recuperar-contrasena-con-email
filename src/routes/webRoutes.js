import { Router } from 'express'

const router = Router()
const viewsPath = { root: './src/views' }

router.get('/', (req, res) => {
    res.sendFile('/login.html', viewsPath)
})
router.get('/register', (req, res) => {
    res.sendFile('/user-register.html', viewsPath)
})
router.get('/verify-email', (req, res) => {
    res.sendFile('/usuarios/verify-email.html', viewsPath)
})
router.get('/verify-success', (req, res) => {
    res.sendFile('/usuarios/verify-success.html', viewsPath)
})
router.get('/reset-password', (req, res) => {
    res.sendFile('/usuarios/reset-password.html', viewsPath)
})
router.get('/forgot-password', (req, res) => {
    res.sendFile('/usuarios/forgot-password.html', viewsPath)
})
router.get('/recovery-code', (req, res) => {
    res.sendFile('/usuarios/recovery-code.html', viewsPath)
})
router.get('/usuarios/panel', (req, res) => {
    res.sendFile('/usuarios/index.html', viewsPath)
})
router.get('/productos/panel', (req, res) => {
    res.sendFile('/productos/index.html', viewsPath)
})

export default router