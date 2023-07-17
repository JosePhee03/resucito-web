import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@components'
import './components'

interface Anchor {
  href: string
  iconText: string
  text: string
  color: string
}

interface Details {
  summary: string
  UnorderedList: Anchor[]
}

const i18n = {
  es: {
    indexTittle: 'ÍNDICE DE CANTOS'
  },
  en: {
    indexTittle: 'INDEX CANTICLE'
  }
}

const ArrayListHome: Array<Details | Anchor> = [
  {
    href: '/search',
    iconText: '',
    text: 'Índice Alfabético',
    color: 'default'
  },
  {
    summary: 'Etapas del Camino',
    UnorderedList: [
      {
        href: '/search/precatechumenate',
        iconText: 'P',
        text: 'Precatecumenado',
        color: 'precatechumenate'
      },
      {
        href: '/search/catechumenate',
        iconText: 'C',
        text: 'Catecumenado',
        color: 'catechumenate'
      },
      {
        href: '/search/election',
        iconText: 'E',
        text: 'Elección',
        color: 'election'
      },
      {
        href: '/search/liturgy',
        iconText: 'L',
        text: 'Liturgia',
        color: 'liturgy'
      }
    ]
  },
  {
    summary: 'Tiempo Litúrgico',
    UnorderedList: [
      {
        href: '/search/advent',
        iconText: '',
        text: 'Adviento',
        color: 'default'
      },
      {
        href: '/search/catechumenate',
        iconText: '',
        text: 'Navidad',
        color: 'default'
      },
      {
        href: '/search/election',
        iconText: '',
        text: 'Cuaresma',
        color: 'default'
      },
      {
        href: '/search/liturgy',
        iconText: '',
        text: 'Pascua',
        color: 'default'
      },
      {
        href: '/search/liturgy',
        iconText: '',
        text: 'Pentecostés',
        color: 'default'
      }
    ]
  },
  {
    summary: 'Orden Litúrgico',
    UnorderedList: [
      {
        href: '/search/advent',
        iconText: '',
        text: 'Entrada',
        color: 'default'
      },
      {
        href: '/search/catechumenate',
        iconText: '',
        text: 'Paz y ofrendas',
        color: 'default'
      },
      {
        href: '/search/election',
        iconText: '',
        text: 'Fracción del pan',
        color: 'default'
      },
      {
        href: '/search/liturgy',
        iconText: '',
        text: 'Salida',
        color: 'default'
      },
      {
        href: '/search/liturgy',
        iconText: '',
        text: 'Canto a la Virgen',
        color: 'default'
      },
      {
        href: '/search/liturgy',
        iconText: '',
        text: 'Cantos de los niños',
        color: 'default'
      },
      {
        href: '/search/liturgy',
        iconText: '',
        text: 'Laudes y visperas',
        color: 'default'
      }
    ]
  }
]

const lang = 'es'

@customElement('page-home')
export class PageHome extends LitElement {
  static styles = [
    css`
      :host {
        display: grid;
        place-items: center;
      }
      
      * { box-sizing: border-box; }

      main {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        margin-bottom: 4rem;
        padding: var(--spacing-sm)
      }
      
      section {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: var(--spacing-sm);
      }

      @media (min-width: 768px) {
        main {
          max-width: 460px;
          padding: 0;
        }
      }
    `
  ]

  render () {
    return html`
    <main>
      <h1>${i18n[lang].indexTittle}</h1>
      <section>
        ${ArrayListHome.map(function (list) {
          if ('summary' in list) {
            return html`
            <c-details sumary="${list.summary}">
              ${list.UnorderedList.map(item => {
                return html`
                <c-list-item href="${item.href}" >
                  <c-list-item-icon slot="icon" color="${item.color}" text="${item.iconText}"></c-list-item-icon>
                  <span slot="text">${item.text}</span>
                </c-list-item>`
              })}
            </c-details>`
          } else if ('href' in list) {
            return html`
            <c-list-item href="${list.href}" >
              <c-list-item-icon slot="icon" color="${list.color}" text="${list.iconText}"></c-list-item-icon>
              <span slot="text">${list.text}</span>
            </c-list-item>`
          } else {
            return html`<span>Error</span>`
          }
        })}
      </section>
    </main>`
  }
}
