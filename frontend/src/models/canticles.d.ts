import { Canticle } from 'canticle'

export interface CanticlesAPIResponse {
  canticles: Canticle[]
  limit: number
  skip: number
  length: number
}

export interface CanticlesResponse {
  canticles: Canticle[]
}
