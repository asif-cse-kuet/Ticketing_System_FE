export default [
  {
    path: 'login',
    component: () => import('./pages/LoginPage.vue'),
    meta: { guestOnly: true }
  },
  {
    path: 'register',
    component: () => import('./pages/RegisterPage.vue'),
    meta: { guestOnly: true }
  }
]
