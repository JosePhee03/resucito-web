import { Canticle } from 'canticle'
import { Request } from 'express'

export function filterByText (req: Request, canticle: Canticle): boolean {
  const queryText = req.query.q as string | undefined
  console.log('QUERY', queryText)
  if (queryText === undefined) return true
  const queryReg = new RegExp(queryText.toLowerCase())

  return queryReg.test(canticle.title.toLowerCase()) || queryReg.test(canticle.subtitle.toLowerCase())
}
