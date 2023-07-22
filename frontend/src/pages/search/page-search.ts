import { LitElement, html, css } from 'lit'
import { customElement, query, state } from 'lit/decorators.js'

import { Canticle, Stage } from 'canticle'

import '@components'
import { searchCanticles } from '@/services/searchCanticle'
import { when } from 'lit/directives/when.js'

@customElement('page-search')
export class PageSearch extends LitElement {
  @state() canticles: Canticle[] = []
  @state() isLoading: boolean = false
  @state() isError: boolean = false
  @state() skip: number = 0
  @state() limit: number = 30
  @state() stage: Stage | '' = ''

  @query('#observerTarget') observerTarget: HTMLDivElement | undefined

  static styles = [
    css`
      :host {
        display: block;
      }

      * { box-sizing: border-box }

      main {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      
      a {
        width: 100%;
        max-width: 460px;
        padding: var(--spacing-md) var(--spacing-lg);
        border-radius: var(--rounded-xs);
        text-decoration: none;
      }

      a:hover {
        background: var(--hover-primary);
        cursor: pointer;
      }

      .canticle-cont {
          width: fit-content;
          display: grid;
          grid-template-columns: fit-content 1fr;
          grid-template-rows: repeat(auto);
          grid-row-gap: var(--spacing-xs);
        }

        c-list-item-icon { 
          grid-area: 1 / 1 / 3 / 2; 
          width: fit-content;
          height: fit-content;
          margin-right: var(--spacing-sm)
        }

        h3 { 
          grid-area: 1 / 2 / 2 / 3;
          margin: 0;
          color: var(--text-color);
          font-size: var(--text-md);
          font-family: var(--font);
          font-style: normal;
          font-weight: 700;
          line-height: normal;
        }

        small { 
          grid-area: 2 / 2 / 3 / 3;
          color: var(--text-color);
          font-family: var(--font);
          font-size: var(--text-sm);
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        #observerTarget {
          display: grid;
          place-items: center;
          padding-block-start: var(--spacing-sm)
        }
    `
  ]

  firstUpdated () {
    this.intersectionObserver()
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

  canticleTemplete (canticle: Canticle) {
    return html`
      <a href="/canticle/${canticle.page}">
        <div class="canticle-cont">
          <c-list-item-icon text="${canticle.page}" color="${canticle.stage}"></c-list-item-icon>
          <h3>${canticle.title ?? 'not fount'}</h3>
          <small>${canticle.subtitle ?? 'subtitle'}</small> 
        </div>
      </a>
    `
  }

  render () {
    return html`
      <main>
        ${this.isError
            ? this.errorTemplate
            : this.canticles.length === 0 && !this.isLoading
              ? this.emplyCanticle
              : this.canticles.map(canticle => {
                return this.canticleTemplete(canticle)
              })}
        <div id="observerTarget">
            ${when(this.isLoading, () => this.loadingTemplate)}
        </div>
      </main>
    `
  }

  fetchData () {
    const response = searchCanticles(this.stage, this.skip, this.limit)
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

  intersectionObserver () {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          this.fetchData()
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
