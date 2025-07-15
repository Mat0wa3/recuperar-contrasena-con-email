import { Router } from 'express'
import UserController from '../controllers/UserController.js'

const router = Router()

router.get('/', UserController.getAll)
router.get('/:userID', UserController.getById)
router.post('/', UserController.create)
router.delete('/:userID', UserController.delete)
router.patch('/:userID', UserController.update)

export default router