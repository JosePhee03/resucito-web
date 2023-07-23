import { CanticlesAPIResponse } from '@/models/canticles'
import { URLCanticles } from './urlCanticles'

export async function searchCanticles (stage = '', tags = '', skip = 0, limit = 10) {
  const request = await fetch(`${URLCanticles}/search?stage=${stage}&tags=${tags}&skip=${skip}&limit=${limit}`)
  console.log(request)
  try {
    const response = await request.json()
    return response as CanticlesAPIResponse
  } catch (e) {
    throw new Error('error al recuperar todos los cantos')
  }
}
