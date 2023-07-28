import { searchCanticles } from '@/services/searchCanticle'
import { getSearchQuery } from '@/util/queryHandle'
import { Canticle } from 'canticle'
import { ReactiveController, ReactiveControllerHost } from 'lit'

export class FetchSearchCanticles implements ReactiveController {
  canticles: Canticle[] = []
  isLoading: boolean = false
  isError: boolean = false
  skip: number = 0
  limit: number = 30
  tags: string = ''
  stage: string = ''
  q: string = ''
  total: number = 0
  readonly host: ReactiveControllerHost

  constructor (host: ReactiveControllerHost) {
    (this.host = host).addController(this)
  }

  hostConnected () {
    window.addEventListener('vaadin-router-location-changed', this._updateNavigation.bind(this))
  }

  hostDisconnected () {
    window.removeEventListener('vaadin-router-location-changed', this._updateNavigation.bind(this))
  }

  _updateNavigation () {
    this.canticles = []
    this.skip = 0
    this._fetchData()
  }

  _fetchData () {
    const { stage, tags, q } = getSearchQuery()
    this.tags = tags
    this.stage = stage
    this.q = q
    const response = searchCanticles(this.q, this.stage, this.tags, this.skip, this.limit)
    this.isLoading = true
    response
      .then(res => {
        console.log(res)
        this.total = res.length
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
