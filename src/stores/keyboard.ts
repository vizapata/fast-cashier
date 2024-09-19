import { defineStore } from 'pinia'
import { ALLOWED_OPERATORS, KEY_TYPES, ALLOWED_ACTIONS } from '@/domain/config'
import type { KeyMetadata } from '@/domain/key-metadata'

const DEFAULT_STACK_VALUE = 0
const isAllowedOperator = (operator: string | number) =>
  ALLOWED_OPERATORS.some((_) => _ === operator)
const applyNumericKey = (number: number, key: KeyMetadata) => number * 10 + (key.value as number)

const digitPressed = (stack: Array<number | string>, key: KeyMetadata) => {
  const top = stack.pop() ?? DEFAULT_STACK_VALUE
  if (isAllowedOperator(top as string)) {
    stack.push(top)
    stack.push(key.value)
  } else {
    stack.push(applyNumericKey(top as number, key))
  }
}
const clearStack = (stack: Array<number | string>, result: number) => {
  while (stack.length > 0) {
    stack.pop()
  }
  stack.push(result)
}

const evalStack = (stack: Array<number | string>) => clearStack(stack, eval(stack.join(' ')))

const operatorPressed = (stack: Array<number | string>, key: KeyMetadata) => {
  const top = stack.pop() ?? DEFAULT_STACK_VALUE
  if (isAllowedOperator(top)) stack.push(key.value)
  else {
    stack.push(top)
    evalStack(stack)
    stack.push(key.value)
  }
}

const backspaceAction = (stack: Array<number | string>) => {
  const top = stack.pop() ?? DEFAULT_STACK_VALUE
  if (isAllowedOperator(top) || ((top as number) < 10 && stack.length > 1)) return
  const stringNumber = `${DEFAULT_STACK_VALUE}${top}`
  stack.push(parseInt(stringNumber.substring(0, stringNumber.length - 1)))
}

const addZeroToStack = (stack: Array<number | string>, zeros: string) => {
  const top = stack.pop() ?? DEFAULT_STACK_VALUE
  let number: number | string = DEFAULT_STACK_VALUE
  if (isAllowedOperator(top)) {
    stack.push(top)
  } else {
    number = top
  }
  stack.push(parseInt(`${number}${zeros}`))
}
const executeAction = (stack: Array<number | string>, action: string) => {
  switch (action) {
    case ALLOWED_ACTIONS.DELETE:
      clearStack(stack, DEFAULT_STACK_VALUE)
      break
    case ALLOWED_ACTIONS.BACKSPACE:
      backspaceAction(stack)
      break
    case ALLOWED_ACTIONS.ENTER:
      evalStack(stack)
      break
    case ALLOWED_ACTIONS.HUNDRED:
    case ALLOWED_ACTIONS.THOUSAND:
      addZeroToStack(stack, action)
      break
    default:
      break
  }
}

export const keyboardStore = defineStore('keyboardStore', {
  state: () => ({
    stack: [DEFAULT_STACK_VALUE] as Array<number | string>,
    category: {} as KeyMetadata,
    registeredKeys: new Map() as Map<string, KeyMetadata>
  }),
  getters: {
    display: (state) => state.stack.join(' '),
    current: (state) => state.stack[0]
  },
  actions: {
    keyPressed(key: KeyMetadata) {
      switch (key.type) {
        case KEY_TYPES.DIGIT:
          digitPressed(this.stack, key)
          break
        case KEY_TYPES.OPERATION:
          operatorPressed(this.stack, key)
          break
        case KEY_TYPES.ACTION:
          executeAction(this.stack, `${key.value}`)
          break
        case KEY_TYPES.CATEGORY:
          this.category = key
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
