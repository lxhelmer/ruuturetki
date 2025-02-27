import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

interface IGame {
  rounds: Number;
  score: Number;
  user: String;
}

const gameSchema = new mongoose.Schema<IGame>({
  rounds: Number,
  score: Number,
  user: String,
})

const Game = mongoose.model<IGame>('Game', gameSchema);

gameSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default Game;
