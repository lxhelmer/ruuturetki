import axios from 'axios'
const base_url = "http://localhost:3001/api/users"

const register = async (user:{username: string, password: String})  => {
  const response = await axios.post(base_url, user)
  return response.data
}

export default { register }
