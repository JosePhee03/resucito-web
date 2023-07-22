import { CCanticle } from '@/components'
import { CCanticleJson } from '@/pages/editor/components/c-canticle-json'
import { PageEditor } from '@/pages/editor/page-editor'

declare global {
  interface HTMLElementTagNameMap {
    'c-canticle': CCanticle
    'c-canticle-json': CCanticleJson
    'c-header': CHeader
    'page-editor': PageEditor
  }
}
