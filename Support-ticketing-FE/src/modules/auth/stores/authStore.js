import { defineStore } from 'pinia'
import authService from '../services/authService'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),

  actions: {
    async login (credentials) {
      try {
        const response = await authService.login(credentials)
        this.user = response.data.user || null
        return true
      } catch (err) {
        console.error(err)
        return false
      }
    },

    async logout () {
      try {
        await authService.logout()
        this.user = null
      } catch (err) {
        console.error(err)
      }
    },

    async fetchUser () {
      try {
        const res = await authService.getCurrentUser()
        this.user = res.data
      } catch (err) {
        this.user = null
        console.error('Failed to fetch user:', err)
      }
    }
  }
})
