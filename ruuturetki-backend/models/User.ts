import mongoose from 'mongoose'

mongoose.set('strictQuery', false)

interface IUser {
  username: string;
  pswd_hash: string;
  games: Array<mongoose.Types.ObjectId>;
}

export type NewUserEntry = Omit<IUser, 'games'>;

const userSchema = new mongoose.Schema<IUser>({
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
})

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.pswd_hash
  }
})

const User = mongoose.model<IUser>('User', userSchema);

export default User
