import mongoose from "mongoose";

mongoose.set("strictQuery", false);

interface IUser {
  username: string;
  pswd_hash: string;
  games: Array<mongoose.Types.ObjectId>;
  admin: boolean;
}

export type NewUserEntry = Omit<IUser, "games">;

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    unique: true,
  },
  pswd_hash: String,
  games: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
  admin: Boolean,
});

userSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.pswd_hash;
  },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
