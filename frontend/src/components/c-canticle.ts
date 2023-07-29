import { Canticle } from 'canticle'
import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

@customElement('c-canticle')
export class CCanticle extends LitElement {
  @state() canticle: Canticle | undefined

  static styles = css`
  :host {
      font-size: 16px;

      --text-2xl: 2em;
      --text-xl: 1.5em;
      --text-lg: 1.125em;
      --text-md: 1em;
      --text-sm: 0.875em;
      --text-xs: 0.75em;
    }
    
    pre {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      margin: 0;
      gap: var(--spacing-xs);
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

    @media (min-width: 1200px) {
      :host {
        font-size: 18px
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
    if (this.canticle === undefined) return html`<h1>Canto Vacio</h1>`

    const { lyric, page, subtitle, title, capo, tone } = this.canticle
    return html`
      <pre>
        <b class="num-page">${page}</b>
        <div class="divisor">
          <span class="tone">Tono: <b>${tone}</b></span>
          <span class="capo">Cejilla <b>${capo}°</b> traste</span>
        </div>
        <div class="divisor">
          <b class="title">${title}</b>
          <b class="subtitle">${subtitle}</b>
        </div>
        ${lyric.split('\n').map((text: string) => {
          const { content, type } = this._parseLyric(text)
          return content !== undefined && type !== undefined
          ? html`<span class="${type}">${content}</span>`
          : html`<br>`
        })}
      </pre>`
  }

  render () {
    return html`${this.templeteCanticle}`
  }

  _parseLyric (text: string) {
    const textRole = [
      '&verse&',
      '&chorus&',
      '&chord&',
      '&coro&'
    ]

    let type
    let content
    for (const role of textRole) {
      const match = text.match(role)
      if (match == null) continue
      else {
        type = role.replaceAll('&', '')
        content = match.input?.replace(role, '').trim()
        break
      }
    }

    return {
      type,
      content
    }
  }
}
