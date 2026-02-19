import mongoose from "mongoose";

mongoose.set("strictQuery", false);

interface IGame {
  rounds: number;
  score: number;
  year: number;
  user: mongoose.Types.ObjectId;
}

const gameSchema = new mongoose.Schema<IGame>({
  rounds: Number,
  score: Number,
  year: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

gameSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Game = mongoose.model<IGame>("Game", gameSchema);

export default Game;
