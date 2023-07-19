import { Route } from '@vaadin/router'

export const routes: Route[] = [
  {
    path: '/',
    name: 'home',
    component: 'page-home',
    action: async () => {
      await import('../pages/home/page-home.js')
    }
  },
  {
    path: '/canticle',
    redirect: '/search'
  },
  {
    path: '/search',
    name: 'search',
    component: 'page-search',
    action: async () => {
      await import('../pages/search/page-search.js')
    }
  },
  {
    path: '/canticle/:page',
    name: 'canticle',
    component: 'page-canticle',
    action: async () => {
      await import('../pages/canticle/page-canticle.js')
    }
  },
  {
    path: '(.*)',
    name: '404',
    component: 'page-not-found',
    action: async () => {
      await import('../pages/404/page-not-found.js')
    }
  }
]
