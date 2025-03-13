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
    console.log(new_game)
    console.log(req.header)
    const token = req.get('Authorization')?.replace('Bearer ', '')
    console.log(token)

    if (!token) {
      throw new Error('Missing authorization token')
    }
    const decoded = jwt.verify(token, env.JWT_SECRET) as JwtPayload
    if (!decoded.id || !decoded.username) {
      console.log(decoded.username)
    }
    
    const user = await User.findById(decoded.id)
    console.log(user)

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

gamesRouter.delete('/:id', (req, res) => {
  Game.findByIdAndDelete(req.params.id)
    .then(_result => {
      res.status(204).end()
    })
    .catch(error => res.send(error))
})

export default gamesRouter
