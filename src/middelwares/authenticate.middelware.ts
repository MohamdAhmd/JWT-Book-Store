import { NextFunction, Request, Response } from 'express'
import Error from '../interfaces/error.interface'
import jwt from 'jsonwebtoken'
import config from '../config'

const handelUnauthorizedError = (next: NextFunction) => {
  const error: Error = new Error('Login Error, Please try again')
  error.status = 401
  next(error)
}

const validateUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.get('Authorization')
    if (authHeader) {
      const bearer = authHeader.split(' ')[0].toLowerCase()
      const token = authHeader.split(' ')[1]
      if (token && bearer == 'bearer') {
        const decode = jwt.verify(token, config.JWT_SECRET as unknown as string)
        if (decode) {
          next()
        } else {
          handelUnauthorizedError(next)
        }
      } else {
        handelUnauthorizedError(next)
      }
    } else {
      handelUnauthorizedError(next)
    }
  } catch (error) {
    handelUnauthorizedError(next)
  }
}

export default validateUser
