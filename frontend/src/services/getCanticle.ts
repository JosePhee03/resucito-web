import { Canticle } from '../models/canticles'

const URL = 'http://localhost:2000'

export async function getCanticle (id: number) {
  const request = await fetch(`${URL}/${id}`)

  try {
    const response = await request.json()
    console.log(response)
    return response as Canticle
  } catch (e) {
    throw new Error('error al recuperar un canto')
  }
}
