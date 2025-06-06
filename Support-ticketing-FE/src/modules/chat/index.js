export default [
  {
    path: 'chat',
    component: () => import('./pages/ChatPage.vue'),
    meta: { requiresAuth: true }
  }
]
