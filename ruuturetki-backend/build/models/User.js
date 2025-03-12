import mongoose from 'mongoose';
mongoose.set('strictQuery', false);
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    pswd_hash: String,
    games: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
});
userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.pswd_hash;
    }
});
const User = mongoose.model('User', userSchema);
export default User;
