import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Canticle } from '@/models/canticles'

@customElement('c-canticle-json')
export class CCanticleJson extends LitElement {
  @property({ attribute: 'canticle', type: Object }) canticle: Canticle | null = null
  @property({ attribute: 'isError', type: Boolean }) isError: boolean = false
  @property({ attribute: 'isLoading', type: Boolean }) isLoading: boolean = true

  static styles = [
    css`
      :host {
        display: block;
        background: #ddd;
        width: 100%;
        height: 100%;
      }

      form {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
      }
      textarea {
        height: 100%;
        font-size: var(--text-md, 1em);
        font-family: var(--font);
        resize: none;
        font-family: inherit;
      }

      .buttons-cont {
        display: flex;
        justify-content: space-between;
      }

      button {
        font-size: var(--text-md, 1em);
        font-family: var(--font);
        padding: 2rem 6rem;
      }
    `
  ]

  get templateError () {
    return html`<h2>Error de conexion</h2>`
  }

  get templateLoading () {
    return html`<h2>loading</h2>`
  }

  get templeteCanticle () {
    if (this.canticle == null) return html`<h1>Canto Vacio</h1>`

    return html`
      <form>
        <textarea>${JSON.stringify(this.canticle, null, '\t')}</textarea>
        <div class="buttons-cont">
          <button type="button">Reset</button>
          <button type="submit">Aplicar</button>
        </div>
      </form>`
  }

  render () {
    return html`
      ${this.isLoading
        ? this.templateLoading
        : this.isError
          ? this.templateError
          : this.templeteCanticle
      }`
  }
}
