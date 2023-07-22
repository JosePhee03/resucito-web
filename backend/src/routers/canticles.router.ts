import { Router } from 'express'
import { getCanticle, getCanticles, searchCanticles } from '../controllers/canticles.controller'

const router = Router()

router.get('/canticles', getCanticles)
router.get('/canticles/search', searchCanticles)
router.get('/canticles/:page', getCanticle)

export default router
