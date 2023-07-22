import { CanticlesAPIResponse } from '@/models/canticles'
import { URLCanticles } from './urlCanticles'

export async function searchCanticles (stage = '', skip = 0, limit = 10) {
  const request = await fetch(`${URLCanticles}/search?stage=${stage === '' ? ' ' : stage}&skip=${skip}&limit=${limit}`)
  console.log(request)
  try {
    const response = await request.json()
    return response as CanticlesAPIResponse
  } catch (e) {
    throw new Error('error al recuperar todos los cantos')
  }
}
