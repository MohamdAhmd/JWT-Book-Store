import { NextFunction, Request ,Response } from 'express';
import  jwt  from 'jsonwebtoken';
import config from '../config'

import UserModel from '../models/user.model';
const userModel = new UserModel()

export const Create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.create(req.body)
    res.json({
      status: 'success',
      data: { ...user },
      message: 'User created successfully',
    })
    //const { email, user_name, first_name, last_name } = res.body.data
    
  } catch (err) {
    next(err)
  }
}
//################################################################
//################################################################
export const getAllUsers = async (
  _req: Request,
  res: Response,
  next: NextFunction
  ) => {
    try {
      const users = await userModel.getMany()
    res.json({
      status: 'success',
      data: { ...users },
      message: 'All Users retrived successfully',
    })
  } catch (err) {
    next(err)
  }
}
//################################################################
//----------------------------------------------------------------
//################################################################
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.getOneUser(req.params.id as unknown as string)
    res.json({
      status: 'success',
      data: { ...user },
      message: 'All User data retrived successfully',
    })
  } catch (err) {
    next(err)
  }
}
//################################################################
//################################################################
export const updateUser = async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const user = await userModel.updateOne(req.body)
    res.json({
      status: 'success',
      data: user,
      message: ' User Updated successfully',
    })
  } catch (err) {
    next(err)
  }
}
//################################################################
//################################################################
export const deleteUser = async(req:Request,res:Response,next:NextFunction)=>{
  try {
    const user = await userModel.deleteUser(req.params.id as unknown as string)
    res.json({
      status: 'success',
      data: { ...user },
      message: ' User Deleted successfully',
    })
  } catch (err) {
    next(err)
  }
}


export const authenticate =async (req:Request,res:Response,next:NextFunction)=>{
try {
  const {email,password} = req.body
  const user = await userModel.authenticate(email,password)
  const token = jwt.sign({user},config.JWT_SECRET as unknown as string)
  if(!user){
    return res.status(401).json({
      status: 'error',
      message: 'the username and password do not match please try again',
    })
  }else{
    return res.json({status: 'success',
    data: { ...user, token },
    message: 'user authenticated successfully',
  })
}
} catch (error) {
  next(error)
}
}