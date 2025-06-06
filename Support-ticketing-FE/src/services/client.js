//Comments are for self-reference and clarity
// This file sets up an Axios client for making HTTP requests to the API
// It includes base URL, credentials, headers, and interceptors for requests and responses

import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json'
  }
})


client.interceptors.request.use(
  (config) => {
    // For injecting tokens
    return config
  },
  (error) => Promise.reject(error)
)

client.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handling (e.g. unauthorized)
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized: Logging out...')
    }
    return Promise.reject(error)
  }
)

export default function () {
  return client
}
