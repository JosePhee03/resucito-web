import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import '@components/utility/u-icon'
import '@components/utility/u-button'
import '@components/composite/c-search'

@customElement('c-header')
export class CHeader extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
       * {box-sizing: border-box;}

      header {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        align-items: center;
        padding:  var(--spacing-sm) var(--spacing-xl);
        background: transparent;
      }

      .logo-text {
        text-decoration: none;
        color: var(--secondary-color);
        font-family: var(--font);
        font-style: normal;
        font-weight: 700;
        line-height: 0;
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
        justify-content: center;
      }

      .right {
        display: flex;
        align-items: center;
        justify-content: right;
      }

    `
  ]

  render () {
    return html`
      <header>
        <div class="left">
          <u-button>
            <u-icon id="menu" size="xl"></u-icon>
          </u-button>
          <a class="logo-text" href="/">Resucito</a>
        </div>
        <div class="center">
          <c-search></c-search>
        </div>
        <div class="right">
          <u-button>
            <u-icon id="moon" size="xl"></u-icon>
          </u-button>
        </div>
      </header>
    `
  }
}
