import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import canticles from '@/data/canticles.json'

@customElement('c-canticle')
export class CCanticle extends LitElement {
  @state() canticle = canticles[5]

  static styles = css`
  :host {
      font-size: 16px;
      width: fit-content;

      --text-2xl: 2em;
      --text-xl: 1.5em;
      --text-lg: 1.125em;
      --text-md: 1em;
      --text-sm: 0.875em;
      --text-xs: 0.75em;
    }

    pre {
      display: flex;
      flex-direction: column;
      margin: 0;
      gap: var(--spacing-md);
    }

    .num-page {
      color: var(--neutral-dark-color, #F00);
      font-family: var(--font);
      font-size: var(--text-xl);
      font-style: normal;
      font-weight: 700;
      line-height: normal;
    }

    .title {
      color: var(--secondary-color, #333);
      font-family: var(--font);
      font-size: var(--text-xl);
      font-style: normal;
      font-weight: 700;
      line-height: var(--text-xl);;
    }

    .subtitle {
      color: var(--neutral-dark-color, #333);
      font-family: var(--font, sans-serif);
      font-size: var(--text-md);
      font-style: normal;
      font-weight: 700;
      line-height: normal; 
    }

    .chord {
      color: var(--red, #F00);
      font-family: var(--font, sans-serif);
      font-size: var(--text-md);
      font-style: normal;
      font-weight: 400;
      line-height: normal; 
    }

    .verse {
      color: var(--black, #000);
      font-family: var(--font, sans-serif);
      font-size: var(--text-lg);
      font-style: normal;
      font-weight: 400;
      line-height: var(--text-lg);
      margin-bottom: var(--spacing-sm);
    }

    .chorus {
      color: var(--black, #000);
      font-family: var(--font, sans-serif);
      font-size: var(--text-md, 0.875rem);
      font-style: normal;
      font-weight: 600;
      line-height: var(--text-xl);
      margin-bottom: var(--spacing-sm);
    }

    .divisor {
      display: flex;
      flex-direction: column;
    }

    .capo, .tone {
      color: var(--neutral-gray-gray, #333);
      font-family: var(--font);
      font-size: var(--text-md);
      font-style: normal;
      font-weight: 700;
      line-height: var(--text-xl);
    }

    .capo > b, .tone > b {
      color: var(--secondary-color)
    }

    @media (min-width: 768px) {
      :host {
        font-size: 18px
      }
    }

    @media (min-width: 1200px) {
      :host {
        font-size: 20px
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

    const { lyric, page, subTitle, title, capo, tone } = this.canticle
    return html`
      <pre>
        <b class="num-page">${page}</b>
        <div class="divisor">
          <span class="tone">Tono: <b>${tone}</b></span>
          <span class="capo">Cejilla <b>${capo}°</b> traste</span>
        </div>
        <div class="divisor">
          <b class="title">${title}</b>
          <b class="subtitle">${subTitle}</b>
        </div>
        ${lyric.map((part) => {
          return html`<div class="divisor">${part.map(({ content, type }) => {
            return html`<span class="t ${type}">${content}</span>`
          })}</div>`
        })}
      </pre>`
  }

  render () {
    return html`${this.templeteCanticle}`
  }
}
