export default [
  {
    path: '/login',
    component: () => import('./pages/LoginPage.vue')
  },
  {
    path: '/register',
    component: () => import('./pages/RegisterPage.vue')
  }
]
