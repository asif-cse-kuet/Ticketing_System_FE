import { defineStore } from 'pinia'
import authService from '../services/authService'
import { useStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    apiToken: useStorage('api_token', '')
  }),

  actions: {
    ...authService,

    async fetchUser () {
      try {
        const response = await this.getCurrentUser()
        this.setUser(response)
        return true
      } catch (err){
        console.log("Session Expired", err)
        this.clearToken()
        return false
      }
    },

    setToken (token) {
      this.apiToken = token
    },

    clearToken () {
      this.apiToken = ''
    },

    setUser(userDetails){
      this.user = userDetails
    }
  }
})
