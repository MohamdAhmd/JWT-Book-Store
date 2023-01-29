import express from 'express'
import usersRoutes from './api/user.router'


const router = express.Router()
router.use('/users',usersRoutes)
export default router