import { Canticle } from 'canticle'

export interface CanticlesAPIResponse {
  canticles: Canticle[]
  total: number
  skip: number
  length: number
}

export interface CanticlesResponse {
  canticles: Canticle[]
}
