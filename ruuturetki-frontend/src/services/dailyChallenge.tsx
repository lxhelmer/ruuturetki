import axios from "axios";
import { BACKEND_URI } from "../config";
import { DailyChallenge } from "../types/types";

let baseUrl = "/api/dailychallenges";
if (BACKEND_URI) {
  baseUrl = BACKEND_URI.concat("/api/dailychallenges");
}

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newDailyChallenge: DailyChallenge) => {
  const response = await axios.post(baseUrl, newDailyChallenge);
  return response.data;
};

const deleteById = async (id: string) => {
  // console.log(id)
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAll, create, deleteById };
