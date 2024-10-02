import { defineStore } from 'pinia'
import { KEY_TYPES } from '@/domain/config'
import type { KeyMetadata } from '@/domain/key-metadata'
import { Calculator } from '@/domain/calculator'

export const keyboardStore = defineStore('keyboardStore', {
  state: () => ({
    stack: new Calculator(),
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
        case KEY_TYPES.ACTION:
          this.stack.keyPressed(key.value)
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
