export default [
  {
    path: 'tickets',
    component: () => import('./pages/TicketListPage.vue'),
    meta: { requiresAuth: false }
  }
]
