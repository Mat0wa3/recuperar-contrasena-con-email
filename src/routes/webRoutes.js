import { Router } from 'express'

const router = Router()
const viewsPath = { root: './src/views' }

router.get('/', (req, res) => {
    res.sendFile('/login.html', viewsPath)
})
router.get('/register', (req, res) => {
    res.sendFile('/user-register.html', viewsPath)
})
router.get('/reset-password', (req, res) => {
    res.sendFile('/usuarios/reset-password.html', viewsPath)
})
router.get('/forgot-password', (req, res) => {
    res.sendFile('/usuarios/forgot-password.html', viewsPath)
})
router.get('/usuarios/panel', (req, res) => {
    res.sendFile('/usuarios/panel.html', viewsPath)
})

export default router