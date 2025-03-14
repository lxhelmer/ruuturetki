import mongoose from 'mongoose';
mongoose.set('strictQuery', false);
const gameSchema = new mongoose.Schema({
    rounds: Number,
    score: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});
gameSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});
const Game = mongoose.model('Game', gameSchema);
export default Game;
