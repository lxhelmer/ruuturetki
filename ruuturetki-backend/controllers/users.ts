import bcrypt from 'bcrypt'
import express from 'express'
const usersRouter = express.Router()
import User from '../models/User.js'
import { z } from 'zod'
import { MongoServerError } from 'mongodb'

const newUserSchema = z.object({
  username: z.string(),
  password: z.string()
});


usersRouter.get('/', async (_req, res) => {
  const users = await User.find({})
  res.json(users)
})

usersRouter.post('/', async (req, res) => {

  try {
    const new_user = newUserSchema.parse(req.body)
    const saltRounds = 10

    const pswd_hash = await bcrypt.hash(new_user.password, saltRounds) 

    const user = new User({
      username: new_user.username,
      pswd_hash: pswd_hash,
      admin: false
    })

    const saved = await user.save()
    res.status(201).json(saved)
  } catch (error) {
    console.log(error)
    if (error instanceof MongoServerError) {
      if (error.code === 11000) {
        res.status(400).send({errorMessage: "Username already taken"})
      }
    } else {
      res.status(400).send(error)
    }
  }
})


export default usersRouter
