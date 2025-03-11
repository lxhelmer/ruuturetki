import express from 'express'
//import jwt from 'jsonwebtoken'
import User from '../models/User.ts'
import { z } from 'zod'

const loginRouter = express.Router()

const loginSchema = z.object({
  username: z.string(),
  password: z.string()
})



loginRouter.post('/', async (req, res) =>  {
  try {
    const login_req = loginSchema.parse(req.body)
    const user = await User.findOne({ username: login_req.username })
    if (!user) {
      throw new Error('No such user')
    }
  } catch (error) {
    res.status(400).send(error)
  }
})

export default loginRouter
