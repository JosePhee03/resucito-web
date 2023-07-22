import { CanticlesAPIResponse } from '../models/canticles'
import { URLCanticles } from './urlCanticles'

export async function getAllCanticles () {
  const request = await fetch(URLCanticles)

  try {
    const response = await request.json()
    return response as CanticlesAPIResponse
  } catch (e) {
    throw new Error('error al recuperar todos los cantos')
  }
}
