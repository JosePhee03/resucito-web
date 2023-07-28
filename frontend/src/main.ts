import { router, routes } from '@router/index'
import '@components'
import './app'

router.setRoutes(routes)
router.setOutlet(document.querySelector('#outlet'))
