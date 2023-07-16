import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

@customElement('c-aside')
export class CAside extends LitElement {
  @property() open: string | null = null

  static styles = [
    css`
      :host {
        z-index: 21;
      }

      * {
        box-sizing: border-box;
      }

      aside {
        position: fixed;
        width: 300px;
        height: 100vh;
        background: var(--primary-color);
        box-shadow: 0 2px 2px var(--neutral-light-color);

        transition: 0.2s ease-out transform;
      }

      ul {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
        padding: 0 var(--spacing-sm);
        margin: 0;
      }

      li {
        list-style: none;
      }

      a {
        text-decoration: none;
        display: flex;
        align-items: center;
        color: var(--text-color, #000);
        font-family: var(--font);
        font-size: var(--text-xl);
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        border-radius: var(--rounded-xs);

        display: flex;
        width: 100%;
        padding: var(--spacing-sm);
        align-items: center;
        gap: var(--spacing-md);
      }

      a:hover {
        background: var(--hover-primary);
        cursor: pointer;
      }

      .selected:hover {
        background: var(--hover-primary);
        cursor: default;
      }

      .close > ul > li > a > span {
        display: none;
      }

      .close {
        width: fit-content;
      }

      .selected {
        color: var(--secondary-color);
        background: var(--active-primary);
      }

      
      @media (max-width: 768px) {
        aside.close {
          transform: translateX(-100%)
        }
        c-aside {
          transform: translateX(100%)
        }
      }

      @media (prefers-reduced-motion: reduce) {
        * {
          -webkit-animation: none !important;
                  animation: none !important;
          -webkit-transition: none !important;
          transition: none !important;
        }
      }

      `
  ]

  updated (changedProperties: Map<'open', string>) {
    const openAtrr = changedProperties.get('open')

    if (openAtrr === null) {
      this.focus()
    }
  }

  render () {
    return html`
      <aside
        class="${classMap({ close: this.open === null })}"
      >
        <ul role="navigation">
          <li role="menuitem"><a href="/" aria-label="Ir al página principal" class="selected"><u-icon id="home" size="xl"></u-icon><span>Inicio</span></a></li>
          <li role="menuitem"><a href="/settings" aria-label="Ir al página de configuraciones"><u-icon id="settings" size="xl"></u-icon><span>Preferencias</span></a></li>
          <li role="menuitem"><a href="/list" aria-label="Ir al página de listas"><u-icon id="list-music" size="xl"></u-icon><span>Listas</span></a></li>
        </ul>
      </aside>
    `
  }
}
