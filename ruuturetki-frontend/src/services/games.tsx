import { IGame } from '../types'
import axios from 'axios'
const base_url = "http://localhost:3001/api/games"

const getGames = async () => {
  const response = await axios.get<IGame[]>(base_url)
  return response.data
}

export default { getGames }
