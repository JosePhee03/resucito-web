import { getSearchQuery, removeTagsSearchQuery } from '@/util/queryHandle'
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
        height: auto;
      }
      div {
        display: flex;
        width: 100%;
        flex-wrap: nowrap;
        gap: var(--spacing-sm);
      }
    `
  ]

  render () {
    const { stage, tags } = getSearchQuery()
    const TAGS = [...stage.split(','), ...tags.split(',')]
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
    removeTagsSearchQuery(event.detail)
  }
}
