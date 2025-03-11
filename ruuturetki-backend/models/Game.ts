import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

interface IGame {
  rounds: number;
  score: number;
  user: mongoose.Types.ObjectId;
}

const gameSchema = new mongoose.Schema<IGame>({
  rounds: Number,
  score: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
})


gameSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Game = mongoose.model<IGame>('Game', gameSchema);

export default Game;
