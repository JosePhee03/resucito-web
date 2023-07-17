import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('c-details')
export class CDetails extends LitElement {
  @property({ type: String }) sumary: string = 'sumary'

  static styles = [
    css`
      :host {
        display: block;
        width: 100%;
      }

      details {
        display: flex;
        justify-content: space-between;
        align-items: center;
        align-self: stretch;
      }
      
      details[open] > summary > u-icon {
        rotate: 180deg;
      }

      summary {
        padding: var(--spacing-sm);
        border-radius: var(--rounded-xs);
        background: var(--trasparent-red-10, rgba(255, 0, 0, 0.10));
        color: var(--secondary-color, #F00);
        font-family: Inter;
        font-size: var(--text-md);
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        list-style: none;
        cursor: pointer;

        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      summary::-webkit-details-marker {
        display: none;
      }

      ul {
        margin: 0;
        padding-left: 0
      }
    `
  ]

  render () {
    return html`
      <details open>
        <summary>
          <span>${this.sumary}</span>
          <u-icon id="chevron-down" size="lg"></u-icon>
        </summary>
        <ul>
         <slot></slot>
        </ul>
      </details>
    `
  }
}
