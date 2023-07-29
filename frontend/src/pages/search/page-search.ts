import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'

import './components'

@customElement('page-search')
export class PageSearch extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      * { box-sizing: border-box }

      main {
        height: 100%;
        max-width: 600px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
      }
    `
  ]

  render () {
    return html`
      <main>
        <c-filter></c-filter>
        <c-search-table></c-search-table>
      </main>
    `
  }
}
