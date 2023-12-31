import { Canticle } from 'canticle'
import { URLCanticles } from './urlCanticles'

export async function getCanticle (page: number) {
  const request = await fetch(`${URLCanticles}/${page}`)

  try {
    const response = await request.json()
    return response as Canticle
  } catch (e) {
    throw new Error('error al recuperar un canto')
  }
}
