import { getSearchQuery, updateQueryTags } from '@/util/queryHandle'
import { LitElement, html, css, nothing } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('c-filter')
export class CFilter extends LitElement {
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
    const { stage, tags } = getSearchQuery()
    const TAGS = [...tags.split(','), ...stage.split(',')]
    return html`
      <div>
        ${TAGS.map(text => {
          if (text === '') return nothing
          return html`<c-tag @remove-tag="${(e: CustomEvent) => this._removeTag(e)}" icon to="/search${text}" text="${text}"></c-tag>`
        })}
      </div>
    `
  }

  _removeTag (event: CustomEvent) {
    updateQueryTags(event.detail)
  }
}
