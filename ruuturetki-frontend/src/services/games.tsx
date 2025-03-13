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
  return response.data
}

const deleteGame = async (id: string) => {
  const config = {
    headers: { Authorization: token}
  }
  console.log(id)
  console.log(config)
  const response = await axios.delete(`${base_url}/${id}`, config)
  return response.data
  
}

export default { getGames, create, deleteGame, setToken }
