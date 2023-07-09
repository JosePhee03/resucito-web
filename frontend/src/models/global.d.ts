import { CCanticle, CCanticleJson } from '../pages/components/composite'

declare global {
  interface HTMLElementTagNameMap {
    'c-canticle': CCanticle
    'c-canticle-json': CCanticleJson
    'layout-editor': LayoutEditor
  }
}
