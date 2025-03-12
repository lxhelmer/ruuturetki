import express from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User'
import { z } from 'zod'
import { env } from '../env'

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
    } else {
      const correct = await bcrypt.compare(login_req.password, user.pswd_hash)
      if (!correct) {
        throw new Error('wrong password')
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }

      const token = jwt.sign(userForToken, env.JWT_SECRET)
      res.status(200).send({ token, username: user.username})
    }

  } catch (error) {
    res.status(400).send(error)
  }
})

export default loginRouter
