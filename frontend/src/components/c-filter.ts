wimport { Stage, Tags } from 'canticle'
import { LitElement, html, css } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'

@customElement('c-filter')
export class CFilter extends LitElement {
  @state() content: string = ''

  static styles = [
    css`
      :host {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: 2rem;
      }
      div {
        display: flex;
        background: green;
        position: absolute;
        width: 100%;
        gap: var(--spacing-sm);
      }
    `
  ]

  render () {
    const tags: Tags[] = ['advent', 'children\'s song', 'christmas', 'communion', 'easter', 'entrance', 'exit', 'fraction of bread', 'lent', 'lutes and vespers', 'peace and offerings', 'pentecost', 'psalm', 'signing to the virgin']
    const stage: Stage[] = ['catechumenate', 'election', 'liturgy', 'precatechumenate']

    const condition = (string: any) => {
      let text = ''
      let to = ''
      if (tags.includes(string)) {
        text = string
        to = `tags=${string as string}`
      } else if (stage.includes(string)) {
        text = string
        to = `stage=${string as string}`
      }

      return { text, to }
    }

    return html`
      <div>
        ${this.content.split(',').map((text) =>
          when(text !== '', () => html`<c-tag icon text="${condition(text).text}" to="/search?${condition(text).to}" ></c-tag>`))}
      </div>
    `
  }
}
