import { Router } from 'express'
import { createCanticle, deleteCanticle, getCanticle, getCanticles, searchCanticles, updateCanticle } from '../controllers/canticles.controller'

const router = Router()

router.get('/api/canticles', getCanticles)
router.get('/api/canticles/search', searchCanticles)
router.get('/api/canticles/:page', getCanticle)

router.put('/api/canticles/:page', updateCanticle)
router.delete('/api/canticles/:page', deleteCanticle)
router.post('/api/canticles', createCanticle)

export default router
