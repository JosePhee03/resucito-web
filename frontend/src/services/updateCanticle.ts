import { Canticle } from 'canticle'
import { URLCanticles } from './urlCanticles'

export async function updateCanticle (page: number, body: Canticle) {
  const request = await fetch(`${URLCanticles}/${page}`, {
    method: 'PUT',
    body
  })

  try {
    const response = await request.json()
    return response as Canticle[]
  } catch (e) {
    throw new Error('error al recuperar un canto')
  }
}
