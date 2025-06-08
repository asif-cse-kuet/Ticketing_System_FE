import axios from 'axios'
import { useAuthStore } from 'src/modules/auth/stores/authStore'

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL_V4 || 'http://localhost:8000/api',
  withCredentials: true,
  headers: {
    Accept: 'application/json'
  }
})

export const clientCSRF = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/',
  withCredentials: true,
  headers: {
    Accept: 'application/json'
  }
})

// Inject Bearer token for authenticated requests
client.interceptors.request.use(config => {
  const authStore = useAuthStore()
  const token = authStore.apiToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

client.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized Access!')
    }
    return Promise.reject(error)
  }
)
