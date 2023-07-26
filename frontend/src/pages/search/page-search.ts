import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@components'
import './components'

@customElement('page-search')
export class PageSearch extends LitElement {
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
      }
    `
  ]

  render () {
    return html`
      <main>
        <c-filter>
          <c-tag icon text="liturgy" to="/search?stage=liturgy" ></c-tag>
        </c-filter>
        <c-search-table></c-search-table>
      </main>
    `
  }
}
