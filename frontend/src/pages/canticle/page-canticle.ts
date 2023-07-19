import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@components'

@customElement('page-canticle')
export class PageCanticle extends LitElement {
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

  render () {
    return html`
      <main>
        <c-tag text="precatecumenado" icon to="/search?precatechumenate"></c-tag>
        <c-canticle></c-canticle>
      </main>
    `
  }
}
