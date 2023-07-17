import { Stage } from '@/models/canticles'
import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('c-list-item-icon')
export class CListItemIcon extends LitElement {
  @property({ type: String }) color: Stage | 'default' | string = 'default'
  @property({ type: String }) text: string = ''

  static styles = [
    css`
      :host {
        display: block;
      }

      span {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        border-radius: var(--rounded-xs);
        height: 1rem;
        
        color: var(--text-color, #000);
        font-family: var(--font);
        font-size: var(--text-xs);
        font-style: normal;
        font-weight: 400;
        line-height: normal; 
      }

      .precatechumenate {
        background: var(--gray)
      }

      .catechumenate {
        background: var(--blue)
      }

      .liturgy {
        background: var(--yellow)
      }

      .election {
        background: var(--green)
      }

      .text {
        padding: var(--spacing-xs);
      }

      .not-text {
        width: .5rem;
      }

      .default {
        background: var(--neutral-light-color, #EEE); 
      }

    `
  ]

  render () {
    return html`<span role="listitem" class="${this.color} ${this.text === '' ? 'not-text' : 'text'}">${this.text}</span>`
  }
}
