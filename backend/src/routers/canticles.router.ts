import { Router } from 'express'
import { deleteCanticle, getCanticle, getCanticles, searchCanticles } from '../controllers/canticles.controller'

const router = Router()

router.get('/canticles', getCanticles)
router.get('/canticles/search', searchCanticles)
router.get('/canticles/:page', getCanticle)

router.put('/canticles/:page', deleteCanticle)

export default router
