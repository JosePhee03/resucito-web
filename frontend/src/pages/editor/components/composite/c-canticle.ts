import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Canticle } from '@models/canticles'

const STAGE_TAG = {
  0: 'precatecumenado',
  1: 'liturgia',
  2: 'catecumenado',
  3: 'eleccíon'
}

@customElement('c-canticle')
export class CCanticle extends LitElement {
  @property({ attribute: 'canticle', type: Object }) canticle: Canticle | null = null
  @property({ attribute: 'isError', type: Boolean }) isError: boolean = false
  @property({ attribute: 'isLoading', type: Boolean }) isLoading: boolean = true

  static styles = css`
    :host {
      background: #ccc;
      font-size: 18px;
    }

    pre {
      display: flex;
      flex-direction: column;
      margin: 0;
    }

    .chorus:last-of-type >  {
      background: red
    }

    .num-page {
      color: var(--neutral-dark-color, #F00);
      font-family: var(--font);
      font-size: var(--text-lg, 1.125rem);
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    .title {
      color: var(--secondary-color, #333);
      font-family: var(--font);
      font-size: var(--text-md, 1rem);
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    .subtitle {
      color: var(--neutral-dark-color, #333);
      font-family: var(--font, sans-serif);
      font-size: var(--text-xs, 0.75rem);
      font-style: normal;
      font-weight: 700;
      line-height: normal; 
    }

    .chord {
      color: var(--red, #F00);
      font-family: var(--font, sans-serif);
      font-size: var(--text-sm, 0.875rem);
      font-style: normal;
      font-weight: 400;
      line-height: normal; 
    }

    .verse {
      color: var(--black, #000);
      font-family: var(--font, sans-serif);
      font-size: var(--text-sm, 0.875rem);
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      text-transform: lowercase; 
    }

    .chorus {
      color: var(--black, #000);
      font-family: var(--font, sans-serif);
      font-size: var(--text-sm, 0.875rem);
      font-style: normal;
      font-weight: 600;
      line-height: bold; 
    }

    @media (min-width: 768px) {
      :host {
        font-size: 24px
      }
    }

    @media (min-width: 1200px) {
      :host {
        font-size: 28px
      }
    }
  `

  get templateError () {
    return html`<h2>Error de conexion</h2>`
  }

  get templateLoading () {
    return html`<h2>loading</h2>`
  }

  get templeteCanticle () {
    if (this.canticle == null) return html`<h1>Canto Vacio</h1>`

    const { lyric, page, stage, subTitle, title } = this.canticle
    return html`
      <pre>
        <b class="tag">${STAGE_TAG[stage]}</b>
        <b class="num-page">${page}</b>
        <b class="title">${title}</b>
        <b class="subtitle">${subTitle}</b>
        ${lyric.map(({ content, type }) => {
          return html`<span class="t ${type}">${content}</span>`
        })}
      </pre>`
  }

  render () {
    return html`
      ${this.isLoading
        ? this.templateLoading
        : this.isError
          ? this.templateError
          : this.templeteCanticle
      }`
  }
}
