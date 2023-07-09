import { CanticlesAPIResponse } from '../models/canticles'

const URL = 'http://localhost:2000'

export async function getAllCanticles () {
  const request = await fetch(URL)

  try {
    const response = await request.json()
    console.log(response)
    return response as CanticlesAPIResponse
  } catch (e) {
    throw new Error('error al recuperar todos los cantos')
  }
}
