import { Canticle } from 'canticle'
import { LitElement, html, css } from 'lit'
import { customElement, query } from 'lit/decorators.js'
import { when } from 'lit/directives/when.js'
import { FetchSearchCanticles } from '../controllers/fetchSearchCanticles'

@customElement('c-search-table')
export class CSearchTable extends LitElement {
  data = new FetchSearchCanticles(this)

  @query('#observerTarget') observerTarget?: HTMLDivElement

  static styles = [
    css`
      :host {
        display: block;
      }

      * { box-sizing: border-box }

      .table {
        width: 100%;
      }

      .table-row {
        display: grid;
        grid-template-columns: 5rem 1fr 5rem;
      }
      
      .table-head {
        padding: var(--spacing-xs) var(--spacing-sm);
        border-bottom: 2px solid var(--text-color);
      }

      .col-1, .col-3 {
        display: grid;
        place-items: center;
      }

      .col-2 {
        width: 100%;
      }

      a {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: var(--spacing-xs);
        padding: var(--spacing-md) 0;
        text-decoration: none;
      }

      h3 { 
        margin: 0;
        color: var(--text-color);
        font-size: var(--text-md);
        font-family: var(--font);
        font-style: normal;
        font-weight: 700;
        line-height: normal;
      }

      small { 
        color: var(--text-color);
        font-family: var(--font);
        font-size: var(--text-sm);
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }

      .search-link {
        padding: 0 var(--spacing-sm);
        border-radius: var(--rounded-xs);
        text-decoration: none;
      }

      .search-link:hover {
        background: var(--hover-primary);
        cursor: pointer;
      }

      #observerTarget {
        display: grid;
        place-items: center;
        padding-block-start: var(--spacing-sm);
        background: red;
        padding: 20px;
      }
    `
  ]

  _rowSearchCanticle (canticle: Canticle, index: number) {
    return html`
      <div role="row" aria-rowindex="${index + 2}" class="table-row search-link">  
        <div role="gridcell" aria-colindex="1" class="col-1">
          <c-list-item-icon text="${canticle.page}" color="${canticle.stage}"></c-list-item-icon>
        </div>
        <div role="gridcell" aria-colindex="2" class="col-2">
          <a href="/canticle/${canticle.page}">
            <h3>${canticle.title}</h3>
            <small>${canticle.subtitle}</small>
          </a>
        </div>
        <div role="gridcell" aria-colindex="3" class="col-3">no</div>
      </div>
    `
  }

  firstUpdated () {
    this._intersectionObserver()
  }

  get loadingTemplate () {
    return html`<h2>Loading...</h2>`
  }

  get emplyCanticle () {
    return html`<h2>NO encontrado</h2>`
  }

  get errorTemplate () {
    return html`<h2>Error :c</h2>`
  }

  render () {
    const { canticles, isLoading, total } = this.data

    return html`
    <div role="grid" aria-rowcount="${canticles.length + 1}" aria-colcount="${3}" class="table">
      <div role="row" aria-rowindex="1" class="table-row table-head">
        <div role="columnheader" aria-colindex="1" class="col-1">Page</div>
        <div role="columnheader" aria-colindex="2" class="col-2">Canticle: ${total}</div>
        <div role="columnheader" aria-colindex="3" class="col-3">Favorite</div>
      </div>
      ${canticles.map((canticle, index) => this._rowSearchCanticle(canticle, index))}
      <div id="observerTarget">
        ${when(isLoading, () => this.loadingTemplate)}
      </div>
    </div>
    `
  }

  _intersectionObserver () {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          this.data._fetchData()
        }
      },
      { threshold: 0.5 }
    )
    if (this.observerTarget instanceof HTMLDivElement) {
      observer.observe(this.observerTarget)
    }
  }
}
