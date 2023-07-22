import { Request } from 'express'

interface SendRespose<T> {
  data: T[]
  length: number
  limit: number
  skip: number
}

const QUERY_PARAMS = {
  SKIP: 'skip',
  LIMIT: 'limit',
  SEARCH: 'q'
}

export const queryHandle = <T> (data: T[], { query }: Request): SendRespose<T> => {
  let limit = 10
  let skip = 0
  const newData: T[] = []

  for (const [key, value] of Object.entries(query)) {
    if (Object.values(QUERY_PARAMS).includes(key)) {
      if (value === undefined || value === '') continue
      if (key === QUERY_PARAMS.SKIP) skip = +value
      if (key === QUERY_PARAMS.LIMIT) limit = +value
      continue
    }
  }

  data.forEach((item, index) => {
    if (index >= limit + skip) return

    const canticleValid = index >= skip
    if (canticleValid) {
      newData.push(item)
    }
  })

  return {
    data: newData,
    length: data.length,
    limit,
    skip
  }
}
