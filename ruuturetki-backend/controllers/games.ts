import express from 'express'
const gamesRouter = express.Router()
import Game from '../models/Game'
import { z } from 'zod'
import { env } from '../env'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../models/User'

const newGameSchema = z.object({
  rounds: z.number(),
  score: z.number(),
});

gamesRouter.get('/',  (_req, res) => {
  Game.find({}).populate('user').then(games =>  {
    res.json(games)
  })
})

// token implementation in ts got help from: https://dev.to/juliecherner/authentication-with-jwt-tokens-in-typescript-with-express-3gb1

gamesRouter.post('/', async (req, res) => { 
  try {
    const new_game = newGameSchema.parse(req.body)
    const token = req.get('Authorization')?.replace('Bearer ', '')

    if (!token) {
      throw new Error('Missing authorization token')
    }
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload
    const user = await User.findById(decoded.id)

    if (!user) {
      throw new Error("Token doesn't match any user")
    }
    const game = new Game({
      rounds: new_game.rounds,
      score: new_game.score,
      user: user._id,
    })
    game.save().then(saved => {
      res.status(201).json(saved)
    })
  } catch (error) {
    res.status(400).send(error)
  }
})

gamesRouter.delete('/:id', async (req, res) => {
  console.log('reached router')

  try {
    const token = req.get('Authorization')?.replace('Bearer ', '')

    if (!token) {
      throw new Error('Missing authorization token')
    }
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload
    const user = await User.findById(decoded.id)

    if (!user) {
      throw new Error("Token doesn't match any user")
    }
    if (user.admin) {
      try {
        await Game.findByIdAndDelete(req.params.id)
        res.status(204).end()
      } catch (error) {
        res.send(error)
      }
    }
  } catch (error){
    console.log(error)
    res.send(error)
  }
})

export default gamesRouter
