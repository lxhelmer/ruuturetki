import mongoose from "mongoose";

mongoose.set("strictQuery", false);

interface DailyScore {
  date: string;
  playerName: string;
  score: number;
}

const dailyScoreSchema = new mongoose.Schema<DailyScore>({
  date: String,
  playerName: String,
  score: Number,
});

dailyScoreSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const DailyScore = mongoose.model<DailyScore>("DailyScore", dailyScoreSchema);

export default DailyScore;
