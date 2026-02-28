import axios from "axios";
import { BACKEND_URI } from "../config";
import { DailyScore } from "../types/types";

let baseUrl = "/api/dailyscores";
if (BACKEND_URI) {
  baseUrl = BACKEND_URI.concat("/api/dailyscores");
}

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getByDate = async (date: string) => {
  const response = await axios.get(`${baseUrl}/${date}`);
  return response.data;
};

const create = async (newDailyScore: DailyScore) => {
  const response = await axios.post(baseUrl, newDailyScore);
  return response.data;
};

const deleteById = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};

export default { getAll, getByDate, create, deleteById };
