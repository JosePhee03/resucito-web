import { Tags } from 'canticle'
import { Request } from 'express'

const TAGS: Tags[] = [
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

export function filterByTags (req: Request): Tags[] {
  const queryTags = req.query.tags as String | undefined

  if (queryTags !== undefined) {
    const newTagsArray = queryTags.split(',')
    const newTags = TAGS.filter(Tags => {
      return newTagsArray.some(item => item === Tags)
    })
    console.log(newTags)
    if (newTags.length === 0) return []
    else return newTags
  }

  return []
}
