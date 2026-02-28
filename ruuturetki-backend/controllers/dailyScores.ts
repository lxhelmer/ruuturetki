import express from "express";
const dailyScoresRouter = express.Router();
import { z } from "zod";
import DailyScore from "../models/DailyScore.js";

const newDailyScoreSchema = z.object({
  date: z.string(),
  playerName: z.string(),
  score: z.number(),
});

dailyScoresRouter.get("/", (_request, response) => {
  void DailyScore.find({}).then((dailyScore) => {
    response.json(dailyScore);
  });
});

dailyScoresRouter.get("/:date", (request, response) => {
  void DailyScore.find({ date: request.params.date }).then((dailyScore) => {
    response.json(dailyScore);
  });
});

dailyScoresRouter.post("/", (request, response) => {
  try {
    const newDailyScore = newDailyScoreSchema.parse(request.body);
    const dailyScore = new DailyScore({
      date: newDailyScore.date,
      playerName: newDailyScore.playerName,
      score: newDailyScore.score,
    });
    void dailyScore.save().then((saved) => {
      response.status(201).json(saved);
    });
  } catch (error) {
    response.status(400).send(error);
  }
});

dailyScoresRouter.delete("/:id", async (request, response) => {
  try {
    await DailyScore.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    response.send(error);
  }
});

export default dailyScoresRouter;
