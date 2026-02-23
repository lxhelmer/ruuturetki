import express from "express";
const dailyChallengesRouter = express.Router();
import DailyChallenge from "../models/DailyChallenge.js";
import { z } from "zod";

const newDailyChallengeSchema = z.object({
  date: z.string(),
  maplayer: z.string(),
  moving: z.boolean(),
  timed: z.union([z.number(), z.null()]),
  dailyChallenge: z.array(
    z.object({
      id: z.number(),
      zoom: z.number(),
      latlng: z.object({ lat: z.number(), lng: z.number() }),
    }),
  ),
});

dailyChallengesRouter.get("/", (_request, response) => {
  void DailyChallenge.find({}).then((dailyChallenges) => {
    response.json(dailyChallenges);
  });
});

dailyChallengesRouter.get("/:id", async (request, response) => {
  try {
    const dailyChallenge = await DailyChallenge.findById(request.params.id);
    if (!dailyChallenge) {
      response.status(404).json({ error: "Daily challenge not found" });
    }
    response.json(dailyChallenge);
  } catch (error) {
    response.status(400).send(error);
  }
});

dailyChallengesRouter.post("/", (request, response) => {
  try {
    const newDailyChallenge = newDailyChallengeSchema.parse(request.body);
    const dailyChallenge = new DailyChallenge({
      date: newDailyChallenge.date,
      maplayer: newDailyChallenge.maplayer,
      moving: newDailyChallenge.moving,
      timed: newDailyChallenge.timed,
      dailyChallenge: newDailyChallenge.dailyChallenge,
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
