//src>modules>auth>services>authService.js
import { client } from 'src/services/client'
import { useAuthStore } from '../stores/authStore'

export default {
  async login (credentials) {
    const authStore = useAuthStore()
    const response = await client.post('/auth/login', credentials)
    authStore.setToken(response.data.token)
    authStore.setUser(response.data.user)
    return response
  },

  async logout () {
    const authStore = useAuthStore()
    await client.post('/auth/logout')
    authStore.clearToken()
  },

  async getCurrentUser () {
    return client.get('/user')
  }
}
