import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { getCanticle } from '@/services/getCanticle'
import { router } from '@/router/router'

import { Canticle } from 'canticle'
import '@components'

@customElement('page-canticle')
export class PageCanticle extends LitElement {
  @state() canticle: Canticle | undefined
  @state() page: number | undefined
  @state() isError = false
  @state() isLoading = true

  static styles = [
    css`
      :host {
        display: block;
      }

      main {
        display: grid;
        width: fit-content;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
        grid-column-gap: 0px;
        grid-row-gap: var(--spacing-md);
        margin: var(--spacing-lg) auto;
      }

    `
  ]

  async connectedCallback () {
    super.connectedCallback()
    const page = Number(router.location.params.page)

    if (isNaN(page)) this.isError = true
    else {
      this.page = page
      const response = await getCanticle(this.page)
      try {
        this.canticle = response
      } catch (e) {
        console.log(e)
        this.isError = true
      } finally {
        this.isLoading = false
      }
    }
  }

  render () {
    return html`
      <main>
        ${this.canticle === undefined
          ? html`<h1>Error</h1>`
          : html`
          <c-tag text="${this.canticle.stage}" to="/search?precatechumenate"></c-tag>
          <c-canticle .canticle="${this.canticle}"></c-canticle>
        `}
      </main>
    `
  }
}
