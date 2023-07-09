import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { getAllCanticles } from './services/getAllCanticles'

@customElement('my-element')
export class MyElement extends LitElement {
  @property({ type: String })
    text = 'hola mundo'

  render () {
    return html`
      <h1>${this.text}</h1>
    `
  }

  async prueba () {
    await getAllCanticles()
  }

  connectedCallback (): void {
  }

  static styles = css`
    h1 {
      color: var(--text-color);
    }
  `
}
