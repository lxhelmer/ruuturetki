import mongoose from "mongoose";

mongoose.set("strictQuery", false);

interface DailyChallenge {
  date: string;
  maplayer: string;
  moving: boolean;
  timed: number | null;
  dailyChallenge: {
    id: number;
    zoom: number;
    latlng: { lat: number; lng: number };
  }[];
}

const dailyChallengeSchema = new mongoose.Schema<DailyChallenge>({
  date: String,
  maplayer: String,
  moving: Boolean,
  timed: { type: Number, default: null },
  dailyChallenge: [
    {
      id: Number,
      zoom: Number,
      latlng: { lat: Number, lng: Number },
    },
  ],
});

dailyChallengeSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const DailyChallenge = mongoose.model<DailyChallenge>(
  "DailyChallenge",
  dailyChallengeSchema,
);

export default DailyChallenge;
