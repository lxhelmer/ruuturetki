import express from 'express';
import cors from 'cors'
import gamesRouter from './controllers/games.ts'
import mongoose from 'mongoose'
import { env } from "./env.ts";


const app = express()
app.use(express.json())

mongoose.connect(env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })


app.use('/api/games', gamesRouter)
app.use(cors())

export default app
