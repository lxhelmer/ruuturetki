import mongoose from "mongoose";

mongoose.set("strictQuery", false);

interface DailyChallenge {
  date: string;
  dailyChallenge: {
    id: number;
    zoom: number;
    draggable: boolean;
    latlng: { lat: number; lng: number };
  }[];
  maplayer: string;
}

const dailyChallengeSchema = new mongoose.Schema<DailyChallenge>({
  date: String,
  dailyChallenge: {
    id: Number,
    zoom: Number,
    draggable: Boolean,
    latlng: { lat: Number, lng: Number },
  },
  maplayer: String,
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
