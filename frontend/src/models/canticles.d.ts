export interface CanticlesAPIResponse {
  canticles: Canticle[]
  total: number
  skip: number
  limit: number
}

export interface CanticleResponse {
  canticles: Canticle
}

type STAGE = 0 | 1 | 2 | 3
export type Stage = 'precatechumenate' | 'catechumenate' | 'liturgy' | 'election'

export interface Canticle {
  lyric: Lyric[]
  page: string
  title: string
  subTitle: string
  stage: Stage
}

export interface Lyric {
  type: 'chord' | 'verse' | 'chorus' | 'coro'
  content: string
}
