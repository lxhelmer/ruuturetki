import axios from 'axios'
import { BACKEND_URI } from '../config'

let base_url = "/api/login"
if (BACKEND_URI) {
  base_url = BACKEND_URI.concat("/api/login")
}

const login = async (user:{username: string, password: String})  => {
  const response = await axios.post(base_url, user)
  return response.data
}

export default { login }
