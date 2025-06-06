import client from 'src/services/client'

export default {
  async login (credentials) {
    await client().get('/sanctum/csrf-cookie', { withCredentials: true })
    return client().post('/login', credentials, { withCredentials: true })
  },

  async logout () {
    return client().post('/logout', {}, { withCredentials: true })
  },

  async getCurrentUser () {
    return client().get('/api/user') // Adjust this if your route is different
  }
}
