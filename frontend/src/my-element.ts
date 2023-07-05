import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('my-element')
export class MyElement extends LitElement {
  @property({ type: String })
    text = 'hola mundo'

  render () {
    return html`
      <h1>${this.text}</h1>
    `
  }

  static styles = css`
    h1 {
      color: var(--text-color);
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
