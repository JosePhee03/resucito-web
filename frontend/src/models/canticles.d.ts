export interface CanticlesAPIResponse {
  canticles: Canticle[]
  total: number
}

export interface Canticle {
  lyric: Lyric[]
  numPage: string
  title?: string
  subTitle?: string
  stage: string
}

export interface Lyric {
  type: 'chord' | 'verse' | 'chorus' | 'coro'
  content: string
}
