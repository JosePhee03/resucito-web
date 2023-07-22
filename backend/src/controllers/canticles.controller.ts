import { Request, Response } from 'express'
import { Canticle } from 'canticle'
import { handleHttp } from '../utils/error.util'
import { queryHandle } from '../utils/query.util'

import data from '../RESUCITO/ES/v6/2014.json'
import { filterByStage } from '../utils/filterCanticles.util'

const CANTICLE = data as Canticle[]

export const getCanticles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { data, length, limit, skip } = queryHandle<Canticle>(CANTICLE, req)
    res.send({ canticles: data, length, skip, limit })
  } catch (e) {
    handleHttp(res, 'ERROR_GET_CANTICLES')
  }
}

export const getCanticle = async ({ params }: Request, res: Response): Promise<void> => {
  try {
    const { page } = params
    const canticle = CANTICLE.find(c => c.page === +page)
    if (canticle === undefined) throw Error('Canto no encontrado')
    res.send(canticle)
  } catch (e) {
    handleHttp(res, 'ERROR_GET_CANTICLE')
  }
}

export const searchCanticles = (req: Request, res: Response): void => {
  const stage = filterByStage(req)
  const newCaticles = CANTICLE.filter(c => stage.includes(c.stage))
  const { data, length, limit, skip } = queryHandle<Canticle>(newCaticles, req)

  try {
    res.send({ canticles: data, length, skip, limit })
  } catch (e) {
    handleHttp(res, 'ERROR_GET_SEARCH_CANTICLES')
  }
}

export const deleteCanticle = ({ params }: Request, res: Response): void => {
  const page = params.page ?? 0
  const canticle = CANTICLE.find(c => c.page === +page)
  console.log(canticle)

  try {
    if (canticle === undefined) throw Error('Canto no encontrado')
    res.send(canticle)
  } catch (e) {
    handleHttp(res, 'ERROR_PUT_CANTICLE')
  }
}
