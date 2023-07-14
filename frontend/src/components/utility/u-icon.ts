import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

type IconsID = 'menu' | 'search' | 'exit' | 'moon' | 'chevron-down' | 'chevron-up' | 'home' | 'settings' | 'list-music'
type IconsSize = 'sm' | 'md' | 'lg' | 'xl'
type IconColor = 'text-color' | 'currentColor'

@customElement('u-icon')
export class UIcon extends LitElement {
  @property({ type: String }) id: IconsID = 'menu'
  @property({ type: String }) size: IconsSize = 'md'
  @property({ type: String }) color: IconColor = 'currentColor'

  static styles = [
    css`
      :host {
        display: block;
        line-height: 0;
      }

      .icon {
        stroke-linecap: var(--stroke-round);
        stroke-linejoin: var(--stroke-round);
        fill: none;
      }

      .xl {
        stroke-width: var(--stroke-width-lg);
      }

      .lg {
        stroke-width: var(--stroke-width-lg);
      }

      .text-color {
        stroke: var(--text-color);
      }

      .currentColor {
        stroke: currentColor;
      }

    `
  ]

  render () {
    const SIZE_ICON = {
      sm: '0.75rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem'
    }

    return html`
    <svg focusable="false" class="icon ${this.size} ${this.color}" width="${SIZE_ICON[this.size]}" height="${SIZE_ICON[this.size]}">
      <use href="/icons.svg/#${this.id}" />
    </svg>
    `
  }
}
