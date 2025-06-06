export default [
  {
    path: '/tickets',
    component: () => import('./pages/TicketListPage.vue')
  },
  {
    path: '/create-ticket',
    component: () => import('./pages/CreateTicketPage.vue')
  }
]
