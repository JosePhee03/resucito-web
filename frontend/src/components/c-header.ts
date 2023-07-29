import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'

@customElement('c-header')
export class CHeader extends LitElement {
  @state() variant: 'home' | 'search' = 'home'

  firstUpdated () {
    this._updateNavigation()
    window.addEventListener('vaadin-router-location-changed', this._updateNavigation.bind(this))
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    console.log('dicoasdadsadasdasd')
    window.removeEventListener('vaadin-router-location-changed', this._updateNavigation.bind(this))
  }

  _updateNavigation () {
    const path = window.location.pathname
    console.log('path', path)
    if (path === '/') this.variant = 'home'
    if (path === '/search') this.variant = 'search'
  }

  static styles = [
    css`
      :host {
        display: block;
        position: sticky;
        top: 0;
        z-index: 20;
      }
       * {box-sizing: border-box;}

      header {
        width: 100%;
        background: var(--primary-color);
        display: grid;
        align-items: center;
        padding:  var(--spacing-sm) var(--spacing-sm);
        box-shadow: 2px 0 2px var(--neutral-light-color);
        grid-template-columns: auto 1fr auto;
        gap: var(--spacing-md)
      }

      .logo-text {
        text-decoration: none;
        color: var(--secondary-color);
        font-family: var(--font);
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        font-size: var(--text-2xl);
      }

      .left {
        display: flex;
        align-items: center;
        justify-content: start;
        gap: var(--spacing-sm);
      }

      .center {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .right {
        display: flex;
        align-items: center;
        justify-content: right;
        gap: var(--spacing-sm);
      }

      c-search {
        max-width: 640px;
      }

      c-search.home {
        display: none;
      }


      @media (min-width: 768px) {
        c-search.home {
          display: block;
        }
        #search-button {
          display: none;
        }
        header {
          grid-template-columns: 1fr minmax(auto, 600px) 1fr;
          gap: var(--spacing-xl)
        }
      }

      @media (min-width: 1024px) {
        c-search {
          display: block;
        }
        #search-button {
          display: none;
        }
        .center {
          display: flex;
        }
      }


    `
  ]

  _templateHeaderHome () {
    return html`
      <header variant="home">
        <div class="left">
          <c-button type="button" ariaLabel="Abrir menu lateral">
            <c-icon id="menu" size="xl"></c-icon>
          </c-button>
          <a class="logo-text" href="/">Resucitó</a>
        </div>
        <div class="center">
          <c-search class="home"></c-search>
        </div>
        <div class="right">
          <a href="/search">
            <c-button id="search-button">
              <c-icon id="search" size="xl"></c-icon>
            </c-button>
          </a>
            <c-icon id="moon" size="xl"></c-icon>
          </c-button>
        </div>
      </header>
    `
  }

  _templateHeaderSearch () {
    return html`
      <header variant="search">
        <div class="left">
          <c-button type="button" ariaLabel="Volver hacia atrás" @click="${() => window.history.back()}">
            <c-icon direction="left" id="arrow" size="xl"></c-icon>
          </c-button>
        </div>
        <div class="center">
          <c-search></c-search>
        </div>
        <div class="right">
          <c-icon id="moon" size="xl"></c-icon>
        </div>
      </header>
    `
  }

  render () {
    switch (this.variant) {
      case 'search':
        return this._templateHeaderSearch()
      default:
        return this._templateHeaderHome()
    }
  }
}
