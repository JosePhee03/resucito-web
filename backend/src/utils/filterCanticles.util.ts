import { Stage } from 'canticle'
import { Request } from 'express'

const STAGE: Stage[] = ['catechumenate', 'election', 'liturgy', 'precatechumenate']

export function filterByStage (req: Request): Stage[] {
  const queryStage = req.query.stage as String | undefined
  if (queryStage !== undefined) {
    const newStageArray = queryStage.split(',')
    const newStage = STAGE.filter(stage => {
      return newStageArray.some(item => item === stage)
    })

    if (newStage.length === 0) return []
    else return newStage
  }

  return []
}
