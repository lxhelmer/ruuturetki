import { IGame } from '../types'
import axios from 'axios'
import { BACKEND_URI } from '../config'

let base_url = "/api/games"
if (BACKEND_URI) {
  base_url = BACKEND_URI.concat("/api/games")
}

let token: string | null = null

const setToken = (newToken: string) => {
  token = `Bearer ${newToken}`
}

const getGames = async () => {
  const response = await axios.get<IGame[]>(base_url)
  return response.data
}

const create = async (newGame: {rounds: number, score: number}) => {
  const config = {
    headers: { Authorization: token}
  }
  const response = await axios.post(base_url, newGame, config)
  console.log(response)
  return response.data

}

export default { getGames, create, setToken }
