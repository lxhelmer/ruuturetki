import dayjs from "dayjs";
import { DailyScore } from "../types/types";
import dailyScoreService from "../services/dailyScore";

/**
 * Fetches daily challenge scores for the provided date.
 */
export default async function fetchDailyScores(
  date: dayjs.Dayjs,
  setScores: React.Dispatch<React.SetStateAction<DailyScore[]>>,
) {
  try {
    const dailyScores = await dailyScoreService.getByDate(
      date.format("YYYY-MM-DD"),
    );
    setScores(dailyScores);
  } catch (error) {
    console.log(error);
  }
}
