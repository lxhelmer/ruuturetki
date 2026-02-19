import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { env } from "./env.js";
import gamesRouter from "./controllers/games.js";
import usersRouter from "./controllers/users.js";
import loginRouter from "./controllers/login.js";
import dailyChallengesRouter from "./controllers/dailyChallenges.js";

const app = express();

mongoose
  .connect(env.MONGODB_URI, { dbName: env.DB_NAME })
  .then(() => {
    console.log("connected to MongoDB, database:", env.DB_NAME);
  })
  .catch((error: Error) => {
    console.log("error connecting to MongoDB", error.message);
  });

app.use(cors());
app.use(express.json());
app.use("/api/games", gamesRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/dailychallenges", dailyChallengesRouter);

export default app;
