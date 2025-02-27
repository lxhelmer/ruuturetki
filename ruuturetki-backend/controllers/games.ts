import express from 'express'
const gamesRouter = express.Router()
import Game from '../models/Game.ts'

gamesRouter.get('/',  (_req, res) => {
  Game.find({}).then(games =>  {
    res.json(games)
  })
})

export default gamesRouter
