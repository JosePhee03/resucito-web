import { Canticle, Stage } from 'canticle'
import { Request } from 'express'

interface SearchQuery {
  stage: Stage[]
}

const SEARCH_QUERY: SearchQuery = {
  stage: ['catechumenate', 'liturgy', 'precatechumenate', 'election']
}

export const searchQueryByCanticle = (data: Canticle[], { query }: Request): Canticle[] => {
  console.log(query, 'a', SEARCH_QUERY)

  const newData = data

  return newData
}
