import { defineRouter } from '#q-app/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useAuthStore } from 'src/modules/auth/stores/authStore'

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  })


  Router.beforeEach(async (to, from, next) => {
    const auth = useAuthStore()
    const isLoggedIn = !!auth.user
    if (to.meta.requiresAuth && auth.user === null) {
      try {
        await auth.fetchUser()
      } catch {
        // fail silently
      }
    }
    if (to.meta.requiresAuth && !isLoggedIn) {
      return next('/login')
    }
    if (to.meta.guestOnly && isLoggedIn) {
      return next('/tickets')
    }
    next()
  })


  return Router
})
