export type Chants = Chant[]

export interface Chant {
  lyric: Lyric[]
  numPage?: string
  title: string
  subTitle: string
}

export interface Lyric {
  type: string
  content: string
}
