declare module 'canticle' {
  export interface Canticle {
    lyric: string;
    tone: Chord;
    capo: number;
    tags: Tags[];
    title: string;
    page: number;
    stage: Stage;
    subtitle: string;
  }
  
  export type Chord = string
  
  export type Stage = 'election' | 'precatechumenate' | 'catechumenate' | 'liturgy'
  
  export type Tags = 
  | "psalm"
  | "advent"
  | "children's song"
  | "christmas"
  | "communion"
  | "lent"
  | "easter"
  | "entrance"
  | "exit"
  | "fraction of bread"
  | "lutes and vespers"
  | "peace and offerings"
  | "pentecost"
  | "signing to the virgin"
}
