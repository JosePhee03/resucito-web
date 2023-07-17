import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('layout-canticle')
export class LayoutCanticle extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `
  ]

  render () {
    return html`
      <main>
        Canticle
      </main>
    `
  }
}
