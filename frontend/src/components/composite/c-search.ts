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
      }

      form {
        display: flex;
        width: 460px;
        justify-content: space-between;
        align-items: center;
        position: relative
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
      <form role="search" action="/search" method="get">
        <input placeholder="${i18n[lang].placeholder}" class="input-search" type="text" accesskey="k" aria-label="${i18n[lang].inputSearch}">
        <div class="button-cont">
          <u-button aria-hidden="true" type="reset" ariaLabel="${i18n[lang].buttonReset}">
            <u-icon color="text-color" id="exit" size="lg"></u-icon>
          </u-button>
          <hr>
          <u-button class="button-submit" type="submit" ariaLabel="${i18n[lang].buttonSubmit}">
            <u-icon color="text-color" id="search" size="xl"></u-icon>
          </u-button>
        </div>
      </form>
    `
  }
}
