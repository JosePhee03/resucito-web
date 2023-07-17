import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('page-not-found')
export class PageNotFound extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ]

  render () {
    return html`
      <h1>Página no encontrada</h1>
    `
  }
}
