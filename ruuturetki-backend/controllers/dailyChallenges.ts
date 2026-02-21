import express from "express";
const dailyChallengesRouter = express.Router();
import DailyChallenge from "../models/DailyChallenge.js";
import { z } from "zod";

const newDailyChallengeSchema = z.object({
  date: z.string(),
  dailyChallenge: z.array(
    z.object({
      id: z.number(),
      zoom: z.number(),
      draggable: z.boolean(),
      latlng: z.object({ lat: z.number(), lng: z.number() }),
    }),
  ),
  maplayer: z.string(),
});

dailyChallengesRouter.get("/", (_request, response) => {
  void DailyChallenge.find({}).then((dailyChallenges) => {
    response.json(dailyChallenges);
  });
});

dailyChallengesRouter.post("/", (request, response) => {
  try {
    const newDailyChallenge = newDailyChallengeSchema.parse(request.body);
    const dailyChallenge = new DailyChallenge({
      date: newDailyChallenge.date,
      dailyChallenge: newDailyChallenge.dailyChallenge,
      maplayer: newDailyChallenge.maplayer,
    });
    void dailyChallenge.save().then((saved) => {
      response.status(201).json(saved);
    });
  } catch (error) {
    response.status(400).send(error);
  }
});

dailyChallengesRouter.delete("/:id", async (request, response) => {
  try {
    await DailyChallenge.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    response.send(error);
  }
});

export default dailyChallengesRouter;
