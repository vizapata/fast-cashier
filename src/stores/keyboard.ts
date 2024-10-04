import { defineStore } from 'pinia'
import { ALLOWED_ACTIONS, DEFAULT_CATEGORIES, DEFAULT_CATEGORY, KEY_TYPES } from '@/domain/config'
import type { KeyMetadata } from '@/domain/key-metadata'
import { Calculator } from '@/domain/calculator'
import { useCartStore } from './cart'

export const keyboardStore = defineStore('keyboardStore', {
  state: () => ({
    stack: new Calculator(),
    // TODO: Set default category as Category type
    category: {} as KeyMetadata,
    registeredKeys: new Map() as Map<string, KeyMetadata>
  }),
  getters: {
    display: (state) => state.stack.getDisplay(),
    current: (state) => state.stack.getValue(),
    value: (state) => state.stack.getValue()
  },
  actions: {
    keyPressed(key: KeyMetadata) {
      switch (key.type) {
        case KEY_TYPES.CATEGORY:
          this.category = key
          break
        case KEY_TYPES.DIGIT:
        case KEY_TYPES.OPERATION:
          this.stack.keyPressed(key.value)
          break
        case KEY_TYPES.ACTION:
          this.stack.keyPressed(key.value)
          if (ALLOWED_ACTIONS.ENTER == key.value && this.category && this.value > 0) {
            const cartStore = useCartStore()
            const category =
              DEFAULT_CATEGORIES.find((category) => category.id === this.category.value) ??
              DEFAULT_CATEGORY
            cartStore.addProduct({ category, value: this.value })
            this.stack.keyPressed(ALLOWED_ACTIONS.DELETE)
          }

          break
        default:
          break
      }
    },
    registerKey(key: string, value: KeyMetadata) {
      this.registeredKeys.set(`${key}`.toUpperCase(), value)
    },
    unRegisterKey(key: string) {
      this.registeredKeys.delete(`${key}`.toUpperCase())
    },
    clearKeys() {
      this.registeredKeys.clear()
    },
    existingKeys() {
      return this.registeredKeys.keys
    },
    hasKey(key: string) {
      return this.registeredKeys.has(`${key}`.toUpperCase())
    },
    emitKey(key: string) {
      const k: KeyMetadata | undefined = this.registeredKeys.get(`${key}`.toUpperCase())
      if (k !== undefined) {
        this.keyPressed(k)
      }
    }
  }
})

const useKeyboardStore = keyboardStore
export { useKeyboardStore }
