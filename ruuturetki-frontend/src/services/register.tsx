import axios from 'axios'
import { BACKEND_URI } from '../config'

let base_url = "/api/users"
if (BACKEND_URI) {
  base_url = BACKEND_URI.concat("/api/users")
}

const register = async (user:{username: string, password: String})  => {
  const response = await axios.post(base_url, user)
  return response.data
}

export default { register }
