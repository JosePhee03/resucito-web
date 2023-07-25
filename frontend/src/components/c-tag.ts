import { Stage } from 'canticle'
import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('c-tag')
export class CTag extends LitElement {
  @property() text: Stage | string = ''
  @property({ type: Boolean }) icon: true | null = null
  @property() to: string = ''

  static styles = [
    css`
      :host {
        display: block;
        width: fit-content;
      }

      span {
        display: flex;
        font-size: var(--text-sm);
        padding: .25em .5em;
        gap: .24em;
        width: fit-content;
        justify-content: center;
        align-items: center;
        border-radius: 99px;
        border: 1px solid var(--text-color);
        background: var(--primary-color);
      }

      a, a:active, a:link, a:visited { 
        text-decoration: none;
        color: var(--text-color);
        font-family: var(--font);
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        white-space: nowrap
      }

      a:hover {
        cursor: pointer;
      }

      a:first-letter {
        text-transform: uppercase;
      }

      c-icon:hover {
        cursor: pointer;
      }

      .liturgy { background: var(--yellow)}
      .catechumenate { background: var(--blue)}
      .election { background: var(--green)}
      .precatechumenate { background: var(--gray)}
    `
  ]

  render () {
    const STAGE: string[] = [
      'liturgy',
      'catechumenate',
      'election',
      'precatechumenate'
    ]
    return html`
      <span class="${STAGE.includes(this.text) ? this.text : 'not found'}">
        ${this.icon != null
          ? html`<c-icon @click="${this.removeTag}" id="exit"></c-icon>`
          : ''
        }
        <a href="${this.to}">${this.text}</a>
      </span>
    `
  }

  removeTag () {
    this.dispatchEvent(new CustomEvent('remove-tag', { detail: this.text, bubbles: true, composed: true }))
    this.remove()
  }
}
