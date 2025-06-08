export default [
  {
    path: 'tickets',
    name: 'tickets',
    component: () => import('./pages/TicketListPage.vue'),
    meta: { requiresAuth: true }
  }
]
