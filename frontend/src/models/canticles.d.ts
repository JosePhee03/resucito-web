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

export interface Canticle {
  lyric: Lyric[]
  page: string
  title: string
  subTitle: string
  stage: STAGE
}

export interface Lyric {
  type: 'chord' | 'verse' | 'chorus' | 'coro'
  content: string
}
