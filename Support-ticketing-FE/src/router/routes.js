import authRoutes from 'src/modules/auth'
import ticketRoutes from 'src/modules/tickets'
import chatRoutes from 'src/modules/chat'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'docs', component: () => import('pages/DocsPage.vue') },
      ...authRoutes,
      ...ticketRoutes,
      ...chatRoutes,
    ]
  },


  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
