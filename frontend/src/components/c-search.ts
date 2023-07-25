import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'

const i18n = {
  es: {
    buttonSubmit: 'Buscar',
    buttonReset: 'Borrar búsqueda',
    inputSearch: 'Buscar cantos',
    placeholder: 'Pentecostes, Ave Maria...'
  },
  en: {
    buttonSubmit: 'Search',
    buttonReset: 'Reset input',
    inputSearch: 'Search a canticle',
    placeholder: 'Pentecostes, Ave Maria...'
  }
}

const lang = 'es'

@customElement('c-search')
export class CSearch extends LitElement {
  @state() value = ''

  static styles = [
    css`
      * {box-sizing: border-box}

      :host {
        display: block;
        line-height: 0;
        width: 100%;
      }

      form {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        position: relative;
      }

      .input-search {
        width: 100%;

        color: var(--text-color, #000);
        font-family: var(--font, sans-serif);
        font-size: var(--text-lg, 1.125rem);
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        padding: .8rem 1.5rem;
        padding-right: 6rem;
        border-radius: 2rem;
        border: 1px solid var(--neutral-dark-color, #333);
      }

      hr {
        height: 2rem;
        border: solid 1px var(--neutral-light-color, #ccc);
        margin: 0 .2rem;
        
      }

      .button-cont {
        position: absolute;
        display: flex;
        align-items: center;
        padding: .5rem;
        right: 0;
      }
    `
  ]

  render () {
    return html`
      <form @submit="${this._handleSubmit}" role="search" method="get">
        <input 
          placeholder="${i18n[lang].placeholder}"
          class="input-search"
          type="text"
          accesskey="k"
          name="search"
          aria-label="${i18n[lang].inputSearch}"
        >
        <div class="button-cont">
          <c-button aria-hidden="true" type="reset" ariaLabel="${i18n[lang].buttonReset}">
            <c-icon color="text-color" id="exit" size="lg"></c-icon>
          </c-button>
          <hr>
          <c-button class="button-submit" type="submit" ariaLabel="${i18n[lang].buttonSubmit}">
            <c-icon color="text-color" id="search" size="xl"></c-icon>
          </c-button>
        </div>
      </form>
    `
  }

  _handleSubmit (event: Event) {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement
    const searchData = new FormData(form).get('search') as string
    window.location.replace(`/search?q=${searchData}`)
  }
}
