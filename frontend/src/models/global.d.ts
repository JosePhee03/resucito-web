import { CHeader } from '@/components/composite'
import { CCanticle, CCanticleJson, LayoutEditor } from '@/pages/editor/components'

declare global {
  interface HTMLElementTagNameMap {
    'c-canticle': CCanticle
    'c-canticle-json': CCanticleJson
    'c-header': CHeader
    'layout-editor': LayoutEditor
  }
}
