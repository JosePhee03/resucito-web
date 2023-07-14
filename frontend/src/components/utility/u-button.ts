import { LitElement, html, css, PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('u-button')
export class UButton extends LitElement {
  @property({ type: String }) rounded: 'full' = 'full'
  @property({ type: String }) ariaLabel: string = ''
  @property({ type: String }) type: 'submit' | 'button' | 'reset' | 'menu' = 'button'

  static styles = [
    css`
      :host {
        display: block;
      }

      button {
        background: transparent;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: var(--spacing-sm);
      }

      .full {
        border-radius: 50%;
      }

      button:hover {
        background:  var(--hover-primary);
        cursor: pointer;
      }

    `
  ]

  render () {
    return html`
      <button type="${this.type}" aria-label="${this.ariaLabel}" class="${this.rounded}">
        <slot></slot>
      </button>
    `
  }
}
