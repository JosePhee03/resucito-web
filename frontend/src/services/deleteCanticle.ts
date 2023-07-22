import { Canticle } from 'canticle'
import { URLCanticles } from './urlCanticles'

export async function deleteCanticle (page: number) {
  const request = await fetch(`${URLCanticles}/${page}`, { method: 'DELETE' })

  try {
    const response = await request.json()
    return response as Canticle
  } catch (e) {
    throw new Error('error al recuperar un canto')
  }
}
