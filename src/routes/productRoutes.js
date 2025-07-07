import { Router } from 'express'
import ProductController from '../controllers/productController.js'

const productController = new ProductController()
const router = Router()

router.get('/', productController.getAll)
router.get('/:productID', productController.getById)
router.post('/', productController.create)
router.delete('/:productID', productController.delete)
router.put('/:productID', productController.update)

export default router