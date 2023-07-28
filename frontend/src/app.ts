import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@components'

@customElement('c-app')
export class App extends LitElement {
  static styles = [
    css`
      :host {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: auto 1fr;
      }
    `
  ]

  render () {
    return html`
      <c-header></c-header>
      <slot></slot>
    `
  }
}
