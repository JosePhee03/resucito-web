import { router } from '@/router/router'

export function updateQueryTags (string: string) {
  const { stage, tags } = getSearchQuery()
  const newTags = tags.split(',').filter(p => p !== string).join()
  const newStage = stage.split(',').filter(p => p !== string).join()

  window.location.search = parseSearchQuery(newTags, newStage)
}

export function getSearchQuery () {
  const query = new URLSearchParams(router.location.search)
  const tags = query.get('tags') ?? ''
  const stage = query.get('stage') ?? ''

  return { tags, stage }
}

export function parseSearchQuery (tags = '', stage = '', q = ''): string {
  const queries = { tags, stage, q }

  const searchQueries: string[] = []

  for (const [key, value] of Object.entries(queries)) {
    if (value !== '') searchQueries.push(`${key}=${value}`)
  }

  return searchQueries.join('&')
}
