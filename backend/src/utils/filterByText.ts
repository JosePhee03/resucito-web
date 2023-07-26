import { Canticle } from 'canticle'
import { Request } from 'express'

export function filterByText (req: Request, canticle: Canticle): boolean {
  const queryText = req.query.q as string | undefined

  if (queryText === undefined) return true
  const queryReg = new RegExp(queryText, 'gi')
  return queryReg.test(canticle.title) || queryReg.test(canticle.lyric)
}
