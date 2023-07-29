import { StateCreator, createStore } from 'zustand/vanilla'
import { PersistOptions, createJSONStorage, persist } from 'zustand/middleware'
import { Canticle } from 'canticle'

interface State {
  AllCanticles: Canticle[]
}

type Persist = (
  config: StateCreator<State & Action>,
  options: PersistOptions<State & Action>
) => StateCreator<State & Action>

interface Action {
  setCanticle: (caticle: Canticle | null) => void
  getCanticle: (page: number) => Canticle | undefined
  updateCanticles: (caticle: Canticle) => void
}

export const storeCanticle = createStore<State & Action>(
  (persist as Persist)(
    (set, get) => ({
      AllCanticles: [],
      setCanticle: (canticle) => set(({ AllCanticles }) => {
        const isCanticle = AllCanticles.some((c) => c.page === canticle?.page)
        if (isCanticle || canticle == null) return {}
        return { AllCanticles: [...AllCanticles, canticle] }
      }),
      getCanticle: (page) => {
        const isCanticle = get().AllCanticles.find((c) => c.page === page)
        return isCanticle
      },
      updateCanticles: (canticle) => set(({ AllCanticles }) => {
        const newAllCanticle = AllCanticles.filter((c) => c.page === canticle.page)
        return { AllCanticles: [...newAllCanticle, canticle] }
      })
    }),
    {
      name: 'CANTICLES',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
