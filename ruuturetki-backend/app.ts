import express from 'express';
import cors from 'cors'
import gamesRouter from './controllers/games'
import usersRouter from './controllers/users'
import loginRouter from './controllers/login'
import mongoose from 'mongoose'
import { env } from "./env";


const app = express()


mongoose.connect(env.MONGODB_URI, {dbName: env.DB_NAME})
  .then(() => {
    console.log('connected to MongoDB, database:', env.DB_NAME)
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })


app.use(cors())
app.use(express.json())
app.use('/api/games', gamesRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


export default app
