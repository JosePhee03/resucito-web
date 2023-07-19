import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { Canticle } from '@/models/canticles'
import { getCanticle } from '@/services/getCanticle'

@customElement('layout-editor')
export class LayoutEditor extends LitElement {
  @state() canticle: Canticle | null = null
  @state() page = 27
  @state() isLoading = true
  @state() isError = false

  static styles = [
    css`
      :host {
        display: block;
        font-size: 24px
      }

      main {
        max-width: 100%;
        min-height: 100vh; 
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1fr;
        padding: 3rem;
      }
    `
  ]

  async fetchData () {
    try {
      const canticle = await getCanticle(this.page)
      this.canticle = canticle
    } catch (error) {
      this.isError = true
      console.error('Error al obtener los datos de la API', error)
    } finally {
      this.isLoading = false
    }
  }

  async connectedCallback () {
    super.connectedCallback()
    await this.fetchData()
  }

  render () {
    return html`
      <main>
        <c-canticle 
          .canticle="${this.canticle}" 
          .isError="${this.isError}"
          .isLoading="${this.isLoading}"
        ></c-canticle>
        <c-canticle-json
        .canticle="${this.canticle}" 
        .isError="${this.isError}"
        .isLoading="${this.isLoading}"
        ></c-canticle-json>
      </main>
    `
  }
}
