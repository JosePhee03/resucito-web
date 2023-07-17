import { Canticle } from '@/models/canticles'
import { getAllCanticles } from '@/services/getAllCanticles'
import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import '@components'

@customElement('page-search')
export class PageSearch extends LitElement {
  @state() canticles: Canticle[] = []
  @state() isLoading: boolean = true
  @state() isError: boolean = false

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
    `
  ]

  async connectedCallback () {
    super.connectedCallback()
    const response = await getAllCanticles()

    try {
      this.canticles = response.canticles
    } catch (e) {
      console.log(e)
      this.isError = true
    } finally {
      this.isLoading = false
    }
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
          <c-list-item-icon text="${canticle.page}" color="election"></c-list-item-icon>
          <h3>${canticle.title ?? 'not fount'}</h3>
          <small>${canticle.subTitle ?? 'notsd'}</small> 
        </div>
      </a>
    `
  }

  render () {
    return html`
      <main>
        ${this.isLoading
          ? this.loadingTemplate
          : this.isError
            ? this.errorTemplate
            : this.canticles.length === 0
              ? this.emplyCanticle
              : this.canticles.map(canticle => {
                return this.canticleTemplete(canticle)
              })}
      </main>
    `
  }
}
