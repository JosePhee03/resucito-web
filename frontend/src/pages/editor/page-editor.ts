import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import '@components'
import './components/c-canticle-json'

import { CanticleController } from '@/components/CanticleController'
import { Canticle } from '@/models/canticles'
import { router } from '@/router/router'

@customElement('page-editor')
export class PageEditor extends LitElement {
  @state() page: number = Number(router.location.params.page)
  _data = new CanticleController(this, this.page)
  @state() canticle: Canticle | null = null

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
    const { canticle, isError, isLoading } = this._data
    console.log({ canticle, isError, isLoading })
    return html`
      <main>
        <form @change-json="${this._changeCanticle}">
          <button type="submit">Cambiar</button>
          <c-canticle-json .canticle="${canticle}"></c-canticle-json>
          <c-canticle .canticle="${canticle}"></c-canticle>
        </form>
      </main>
    `
  }

  _changeCanticle (event: CustomEvent) {
    this._data.canticle = JSON.parse(event.detail)
    this.requestUpdate()
  }
}
