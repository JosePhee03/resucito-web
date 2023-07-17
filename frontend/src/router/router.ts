import type { Params } from '@vaadin/router'
import { Router } from '@vaadin/router'
import { routes } from './paths'
export const router = new Router()

router.setRoutes(routes)
router.setOutlet(document.querySelector('#outlet'))

export const urlForName = (name: '404' | 'home' | 'search' | string, params?: Params) => {
  return router.urlForName(name, params)
}
