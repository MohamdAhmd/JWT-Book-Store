import { Router } from 'express'
import * as userControllers from '../../controller/user.controller'
import AuthMiddleware from '../../middelwares/authenticate.middelware'
const router = Router()

router.post('/register', userControllers.Create)
router.get('/', AuthMiddleware, userControllers.getAllUsers)
router.get('/:id', AuthMiddleware, userControllers.getUser)
router.patch('/:id', AuthMiddleware, userControllers.updateUser)
router.delete('/:id', AuthMiddleware, userControllers.deleteUser)
router.post('/login', userControllers.authenticate)
export default router
