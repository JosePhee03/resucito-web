import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'

import './components/c-canticle-json'

@customElement('page-editor')
export class PageEditor extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        font-size: 24px
      }

      main {
        max-width: 100%;
        min-height: 100vh; 
      }

      form {
        display: grid;
        grid-template-columns: 50% 50%;
        grid-template-rows: auto 1fr;
        grid-column-gap: 0px;
        grid-row-gap: 0px;
      }
        
      c-canticle-json {
        grid-area: 2 / 1 / 3 / 2;
      }
      
      c-canticle {
        grid-area: 2 / 2 / 3 / 3;
      }

      button {
        grid-area: 1 / 1 / 2 / 3;
      }
    `
  ]

  render () {
    return html`
      <main>
        <form @change-json="${this._changeCanticle}">
          <button type="submit">Cambiar</button>
          <c-canticle-json></c-canticle-json>
          <c-canticle></c-canticle>
        </form>
      </main>
    `
  }

  _changeCanticle () {
    this.requestUpdate()
  }
}
