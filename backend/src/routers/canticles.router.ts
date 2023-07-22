import { Router } from 'express'
import { createCanticle, deleteCanticle, getCanticle, getCanticles, searchCanticles, updateCanticle } from '../controllers/canticles.controller'

const router = Router()

router.get('/canticles', getCanticles)
router.get('/canticles/search', searchCanticles)
router.get('/canticles/:page', getCanticle)

router.put('/canticles/:page', updateCanticle)
router.delete('/canticles/:page', deleteCanticle)
router.post('/canticles', createCanticle)

export default router
