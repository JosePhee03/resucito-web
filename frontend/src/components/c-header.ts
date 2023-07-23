import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { CAside } from '.'

@customElement('c-header')
export class CHeader extends LitElement {
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
        grid-template-columns: 1fr 1fr 1fr;
        justify-content: space-between;
        align-items: center;
        padding:  var(--spacing-sm) var(--spacing-sm);
        box-shadow: 2px 0 2px var(--neutral-light-color);
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
        align-items: center;
      }

      .right {
        display: flex;
        align-items: center;
        justify-content: right;
        gap: var(--spacing-sm);
      }

      c-search {
        display: none;
      }


      @media (min-width: 768px) {
        c-search {
          display: block;
        }
        #search-button {
          display: none;
        }
        header {
          grid-template-columns: 1fr auto auto;
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
        header {
          grid-template-columns: 1fr 460px 1fr;
          gap: var(--spacing-xl)
        }
        .center {
          display: flex;
        }
      }


    `
  ]

  _handleClickMenu () {
    const asideMenu = document.querySelector('c-aside')
    if (asideMenu instanceof CAside) {
      asideMenu.toggleAttribute('open')
    }
  }

  render () {
    return html`
      <header>
        <div class="left">
          <c-button>
            <c-icon id="menu" size="xl"></c-icon>
          </c-button>
          <a class="logo-text" href="/">Resucito</a>
        </div>
        <div class="center">
          <c-search></c-search>
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
}
