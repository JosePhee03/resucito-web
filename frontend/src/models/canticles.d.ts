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
  lyric: string
  page: number
  title: string
  subTitle: string
  stage: Stage
  tone: Chord
  capo: number
  tags: Tags
}

export type Chord = string

export type Tags = [
  'psalm',
  'advent',
  "children's song",
  'christmas',
  'communion',
  'lent',
  'easter',
  'entrance',
  'exit',
  'fraction of bread',
  'lutes and vespers',
  'peace and offerings',
  'pentecost',
  'signing to the virgin'
]
