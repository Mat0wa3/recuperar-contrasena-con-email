import { Router } from 'express'
import UserController from '../controllers/UserController.js'

const userController = new UserController()
const router = Router()

router.get('/', userController.getAll)
router.get('/:userID', userController.getById)
router.post('/', userController.create)
router.delete('/:userID', userController.delete)
router.put('/:userID', userController.update)

export default router