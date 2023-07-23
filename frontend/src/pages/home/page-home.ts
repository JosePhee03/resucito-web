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
    href: "/search?stage=precatechumenate,catechumenate,election,liturgy&tags=psalm&advent&children's song&christmas&communion&lent&easter&entrance&exit&fraction of bread&lutes and vespers&peace and offerings&pentecost&signing to the virgin",
    iconText: '',
    text: 'Índice Alfabético',
    color: 'default'
  },
  {
    summary: 'Etapas del Camino',
    UnorderedList: [
      {
        href: "/search?stage=precatechumenate&tags=psalm&advent&children's song&christmas&communion&lent&easter&entrance&exit&fraction of bread&lutes and vespers&peace and offerings&pentecost&signing to the virgin",
        iconText: 'P',
        text: 'Precatecumenado',
        color: 'precatechumenate'
      },
      {
        href: "/search?stage=catechumenate&tags=psalm&advent&children's song&christmas&communion&lent&easter&entrance&exit&fraction of bread&lutes and vespers&peace and offerings&pentecost&signing to the virgin",
        iconText: 'C',
        text: 'Catecumenado',
        color: 'catechumenate'
      },
      {
        href: "/search?stage=election&tags=psalm&advent&children's song&christmas&communion&lent&easter&entrance&exit&fraction of bread&lutes and vespers&peace and offerings&pentecost&signing to the virgin",
        iconText: 'E',
        text: 'Elección',
        color: 'election'
      },
      {
        href: "/search?stage=liturgy&tags=psalm&advent&children's song&christmas&communion&lent&easter&entrance&exit&fraction of bread&lutes and vespers&peace and offerings&pentecost&signing to the virgin",
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
        href: '/search?tags=advent&stage=liturgy,election,catechumenate,precatechumenate',
        iconText: '',
        text: 'Adviento',
        color: 'default'
      },
      {
        href: '/search?tags=christmas&stage=liturgy,election,catechumenate,precatechumenate',
        iconText: '',
        text: 'Navidad',
        color: 'default'
      },
      {
        href: '/search?tags=lent&stage=liturgy,election,catechumenate,precatechumenate',
        iconText: '',
        text: 'Cuaresma',
        color: 'default'
      },
      {
        href: '/search?tags=easter&stage=liturgy,election,catechumenate,precatechumenate',
        iconText: '',
        text: 'Pascua',
        color: 'default'
      },
      {
        href: '/search?tags=pentecost&stage=liturgy,election,catechumenate,precatechumenate',
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
        href: '/search?tags=entrance&stage=liturgy,election,catechumenate,precatechumenate',
        iconText: '',
        text: 'Entrada',
        color: 'default'
      },
      {
        href: '/search?tags=peace and offerings&stage=liturgy,election,catechumenate,precatechumenate',
        iconText: '',
        text: 'Paz y ofrendas',
        color: 'default'
      },
      {
        href: '/search?tags=fraction of bread&stage=liturgy,election,catechumenate,precatechumenate',
        iconText: '',
        text: 'Fracción del pan',
        color: 'default'
      },
      {
        href: '/search?tags=exit&stage=liturgy,election,catechumenate,precatechumenate',
        iconText: '',
        text: 'Salida',
        color: 'default'
      },
      {
        href: '/search?tags=signing to the virgin&stage=liturgy,election,catechumenate,precatechumenate',
        iconText: '',
        text: 'Canto a la Virgen',
        color: 'default'
      },
      {
        href: "/search?tags=children's song&stage=liturgy,election,catechumenate,precatechumenate",
        iconText: '',
        text: 'Cantos de los niños',
        color: 'default'
      },
      {
        href: '/search?tags=lutes and vespers&stage=liturgy,election,catechumenate,precatechumenate',
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
