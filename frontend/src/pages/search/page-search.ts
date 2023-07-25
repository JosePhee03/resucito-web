/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { LitElement, html, css } from 'lit'
import { customElement, query, state } from 'lit/decorators.js'
import { searchCanticles } from '@/services/searchCanticle'
import { when } from 'lit/directives/when.js'
import { router } from '@/router/router'

import { Canticle, Stage, Tags } from 'canticle'

import '@components'
import './components'

@customElement('page-search')
export class PageSearch extends LitElement {
  @state() canticles: Canticle[] = []
  @state() isLoading: boolean = false
  @state() isError: boolean = false
  @state() skip: number = 0
  @state() limit: number = 30
  @state() stage: Stage | string = ''
  @state() tags: Tags | string = ''

  @query('#observerTarget') observerTarget: HTMLDivElement | undefined

  static styles = [
    css`
      :host {
        display: grid;
        place-items: center;
      }

      * { box-sizing: border-box }

      main {
        height: 100%;
        max-width: 640px;
        gap: var(--spacing-sm);
        display: flex;
        flex-direction: column;
        overflow-x: hidden;
      }

      #observerTarget {
        display: grid;
        place-items: center;
        padding-block-start: var(--spacing-sm);
        background: red;
        padding: 20px;
      }
    `
  ]

  firstUpdated () {
    this._intersectionObserver()
    this._queryParams()
  }

  get errorTemplate () {
    return html`<h2>Error :c</h2>`
  }

  get loadingTemplate () {
    return html`<h2>Loading...</h2>`
  }

  get emplyCanticle () {
    return html`<h2>NO encontrado</h2>`
  }

  render () {
    return html`
      <main>
        <c-filter @remove-tag="${(e: CustomEvent) => this._removeQueryParam(e)}" .content="${this.stage},${this.tags}"></c-filter>
        ${this.isError
            ? this.errorTemplate
            : this.canticles.length === 0 && this.isLoading
              ? this.emplyCanticle
              : html`<c-search-table .canticles="${this.canticles}"></c-search-table>`}
        <div id="observerTarget">
            ${when(this.isLoading, () => this.loadingTemplate)}
        </div>
      </main>
    `
  }

  _removeQueryParam (event: CustomEvent) {
    const newSearchParams = (string: string) => string.split(',').filter(p => p !== event.detail as string)
    this.stage = `${[...newSearchParams(this.stage)]}`
    this.tags = `${[...newSearchParams(this.tags)]}`
    console.log({ stage: this.stage, tags: this.tags })
    window.location.search = `stage=${this.stage}&tags=${this.tags}`
  }

  _queryParams () {
    const query = new URLSearchParams(router.location.search)
    const tags = query.get('tags') ?? ''
    const stage = query.get('stage') ?? ''
    this.stage = stage
    this.tags = tags
  }

  _fetchData () {
    const response = searchCanticles(this.stage, this.tags, this.skip, this.limit)
    if (!this.isLoading) {
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
        })
    }
  }

  _intersectionObserver () {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          this._fetchData()
          this.isLoading = true
        }
      },
      { threshold: 1 }
    )

    if (this.observerTarget instanceof HTMLDivElement) {
      observer.observe(this.observerTarget)
    }
  }
}
