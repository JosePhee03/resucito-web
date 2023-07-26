import { Request, Response } from 'express'
import { Canticle } from 'canticle'
import { handleHttp } from '../utils/error.util'
import { queryHandle } from '../utils/query.util'

import data from '../RESUCITO/ES/v6/2014.json'
import { filterByStage } from '../utils/filterCanticles.util'
import { filterByTags } from '../utils/filterTags.util'
import { filterByText } from '../utils/filterByText'

let CANTICLES = data as Canticle[]

export const getCanticles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, length, limit, skip } = queryHandle<Canticle>(CANTICLES, req)
    res.send({ canticles: data, length, skip, limit })
  } catch (e) {
    handleHttp(res, 'ERROR_GET_CANTICLES')
  }
}

export const getCanticle = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const { page } = params
    const canticle = CANTICLES.find(c => c.page === +page)
    if (canticle === undefined) throw Error('Canto no encontrado')
    res.send(canticle)
  } catch (e) {
    handleHttp(res, 'ERROR_GET_CANTICLE')
  }
}

export const searchCanticles = (req: Request, res: Response): void => {
  const stage = filterByStage(req)
  const tags = filterByTags(req)
  const newCaticles = CANTICLES.filter(c => stage.includes(c.stage) && c.tags.some(t => tags.includes(t) && filterByText(req, c)))
  const { data, length, limit, skip } = queryHandle<Canticle>(newCaticles, req)

  try {
    res.send({ canticles: data, length, skip, limit })
  } catch (e) {
    handleHttp(res, 'ERROR_GET_SEARCH_CANTICLES')
  }
}

export const updateCanticle = ({ body, params }: Request, res: Response): void => {
  const page = params.page ?? 0
  const newCanticles = CANTICLES.map(c => {
    if (c.page === +page) return body
    else return c
  })

  try {
    CANTICLES = newCanticles
    res.send(newCanticles)
  } catch (e) {
    handleHttp(res, 'ERROR_PUT_CANTICLE')
  }
}

export const createCanticle = ({ body }: Request, res: Response): void => {
  const newCanticles = [...CANTICLES, body]

  try {
    CANTICLES = newCanticles
    res.send(newCanticles)
  } catch (e) {
    handleHttp(res, 'ERROR_POST_CANTICLE')
  }
}

export const deleteCanticle = (req: Request, res: Response): void => {
  const page = req.params.page

  const newCanticles = CANTICLES.filter(c => c.page !== +page)

  try {
    CANTICLES = newCanticles
    res.send(newCanticles)
  } catch (e) {
    handleHttp(res, 'ERROR_DELETE_CANTICLE')
  }
}
