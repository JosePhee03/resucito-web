import { Router } from '@vaadin/router'

export function removeTagsSearchQuery (string: string) {
  const { stage, tags, q } = getSearchQuery()
  const newTags = tags.split(',').filter(p => p !== string).join()
  const newStage = stage.split(',').filter(p => p !== string).join()

  window.location.search = parseSearchQuery({ tags: newTags, stage: newStage, q })
}

export function getSearchQuery () {
  const query = new URLSearchParams(window.location.search)
  const tags = query.get('tags') ?? ''
  const stage = query.get('stage') ?? ''
  const q = query.get('q') ?? ''
  return { tags, stage, q }
}

export function updateSearchQuery (search: string) {
  const { stage, tags } = getSearchQuery()
  Router.go(`search?${parseSearchQuery({ stage, tags, q: search })}`)
}

export function parseSearchQuery ({ tags = '', stage = '', q = '' }) {
  const queries = { tags, stage, q }

  const searchQueries: string[] = []

  for (const [key, value] of Object.entries(queries)) {
    if (value !== '') searchQueries.push(`${key}=${value}`)
  }

  return searchQueries.join('&')
}
