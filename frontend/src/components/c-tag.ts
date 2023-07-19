import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('c-tag')
export class CTag extends LitElement {
  @property() text = ''
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
        border: 1px solid var(--light-gray, #CCC);
        background: var(--light-gray, #CCC);
      }

      a, a:active, a:link, a:visited { 
        text-decoration: none;
        color: var(--text-color);
        font-family: var(--font);
        font-style: normal;
        font-weight: 400;
        line-height: normal;
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
    `
  ]

  render () {
    return html`
      <span>
        ${this.icon != null
          ? html`<c-icon @click="${this.removeTag}" id="exit"></c-icon>`
          : ''
        }
        <a href="${this.to}">${this.text}</a>
      </span>
    `
  }

  removeTag () {
    this.remove()
  }
}
