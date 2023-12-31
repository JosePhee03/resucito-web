import { Canticle } from 'canticle'
import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'

@customElement('c-canticle-json')
export class CCanticleJson extends LitElement {
  @state() canticle?: Canticle

  static styles = [
    css`
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      * { box-sizing: border-box }

      textarea {
        width: 100%;
        height: 100%;
        resize: none;
      }
    `
  ]

  render () {
    return when(this.canticle !== undefined, () =>
      html`
        <textarea @input="${this._changeJson}" name="json">
          ${JSON.stringify(this.canticle, null, '\t')}
        </textarea>
    `)
  }

  _changeJson () {
  }
}
