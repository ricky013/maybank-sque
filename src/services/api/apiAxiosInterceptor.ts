import axios from 'axios'
import { environment } from '../../config/environtment'

const api = axios.create({
  baseURL: environment.BASE_API,
  timeout: 1000000,
  withCredentials: true
})

// Buat instance Axios terpisah khusus untuk refresh token
export const refreshApi = axios.create({
  baseURL: environment.BASE_API,
  timeout: 1000000,
  withCredentials: true
})

api.interceptors.request.use(
  async (req) => {
    return req
  },
  (err) => {
    return Promise.reject(err)
  }
)

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default api
