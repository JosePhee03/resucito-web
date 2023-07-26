import { searchCanticles } from '@/services/searchCanticle'
import { getSearchQuery } from '@/util/queryHandle'
import { Canticle } from 'canticle'
import { ReactiveControllerHost } from 'lit'

export class FetchSearchCanticles {
  canticles: Canticle[] = []
  isLoading: boolean = false
  isError: boolean = false
  skip: number = 0
  limit: number = 30
  tags: string = ''
  stage: string = ''
  readonly host: ReactiveControllerHost

  constructor (host: ReactiveControllerHost) {
    (this.host = host).addController(this)
    const { stage, tags } = getSearchQuery()
    this.tags = tags
    this.stage = stage
  }

  hostConnected () {
  }

  _fetchData () {
    const response = searchCanticles(this.stage, this.tags, this.skip, this.limit)
    this.isLoading = true
    response
      .then(res => {
        if (this.skip <= res.length + this.limit) { this.canticles.push(...res.canticles) }
        this.skip += this.limit
      })
      .catch(e => {
        console.log(e)
        this.isError = true
      })
      .finally(() => {
        this.isLoading = false
        this.host.requestUpdate()
      })
  }
}
