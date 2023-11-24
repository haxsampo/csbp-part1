import axios from 'axios'

const BACKEND = 'http://localhost:3001'
const apiClient = axios.create({
  baseURL: BACKEND
})

export default apiClient