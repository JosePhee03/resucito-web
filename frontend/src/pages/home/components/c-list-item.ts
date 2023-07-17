import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('c-list-item')
export class CListItem extends LitElement {
  @property({ type: String }) href: string = ''

  static styles = [
    css`
      :host {
        display: block;
        width: 100%;
      }

      li {
        list-style: none;
      }
      
      li:first-child {
        margin-top: var(--spacing-xs);
      }

      a {
        text-decoration: none;
        display: flex;
        align-items: center;
        padding: var(--spacing-sm);
        gap: var(--spacing-xs);
        gap: var(--spacing-sm);
        border-radius: var(--rounded-xs); 
      }
      
      a:hover {
        background: var(--hover-primary);
      }

      ::slotted(span) {
        color: var(--text-color);
        font-family: var(--font);
        font-size: var(--text-md);
        font-style: normal;
        font-weight: 400;
        line-height: normal; 
      }
    `
  ]

  render () {
    return html`
      <li>
        <a href="${this.href}" >
          <slot name="icon"></slot>
          <slot name="text"></slot>
        </a>
      </li>
    `
  }
}
