import { Canticle } from '@/models/canticles'
import { storeCanticle } from '@/store/canticles.store'
import { ReactiveController, ReactiveControllerHost } from 'lit'

export class CanticleController implements ReactiveController {
  host: ReactiveControllerHost

  canticle: Canticle | undefined = undefined
  page: number
  isError: boolean = false
  isLoading: boolean = true

  constructor (host: ReactiveControllerHost, page: number) {
    (this.host = host).addController(this)
    this.page = page
    console.log(host)
  }

  hostConnected () {
    this.getCanticle(this.page)
    console.log(JSON.parse(localStorage.getItem('CANTICLES') ?? 'Error local Storage'))
  }

  updateCanticle (canticle: Canticle) {
    storeCanticle.getState().updateCanticles(canticle)
    this.getCanticle(canticle.page)
  }

  getAllCanticles () {
    return storeCanticle.getState().AllCanticles
  }

  getCanticle (page: number) {
    this.canticle = storeCanticle.getState().getCanticle(page)
  }

  hostDisconnected () {
    this.canticle = undefined
    this.isError = false
    this.isLoading = true
  }
}
