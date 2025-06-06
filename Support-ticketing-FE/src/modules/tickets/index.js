export default [
  {
    path: 'tickets',
    component: () => import('./pages/TicketListPage.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: 'tickets/create',
    component: () => import('./pages/CreateTicketPage.vue'),
    meta: { requiresAuth: true }
  }
]
