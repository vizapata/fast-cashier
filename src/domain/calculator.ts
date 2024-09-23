import { ALLOWED_ACTIONS, ALLOWED_OPERATORS } from '@/domain/config'
import type { KeyValue } from '@/domain/key-metadata'
import { NotEmptyStack } from '@/domain/stack'

const DEFAULT_STACK_VALUE = 0
const isOperator = (operator: KeyValue): boolean => ALLOWED_OPERATORS.some((_) => _ === operator)
const isAction = (action: KeyValue): boolean =>
  Object.values(ALLOWED_ACTIONS).some((_) => _ === action)
const isDigit = (digit: KeyValue): boolean => typeof digit === 'number'
const applyNumericKey = (number: number, value: number) => number * 10 + value

export class Calculator {
  stack = new NotEmptyStack<KeyValue>(DEFAULT_STACK_VALUE)

  getValue(): number {
    return this.stack.head() as number
  }

  getDisplay(): string {
    return this.stack.values().join(' ')
  }

  keyPressed(key: KeyValue) {
    if (isOperator(key)) {
      this.operatorPressed(key as string)
    } else if (isAction(key)) {
      this.executeAction(key as string)
    } else if (isDigit(key)) {
      this.digitPressed(key as number)
    } else {
      console.warn('Key not recognized by calculator')
    }
  }

  private executeAction(action: string): void {
    switch (action) {
      case ALLOWED_ACTIONS.DELETE:
        this.stack.clear()
        break
      case ALLOWED_ACTIONS.BACKSPACE:
        this.backspace()
        break
      case ALLOWED_ACTIONS.ENTER:
        this.eval()
        break
      case ALLOWED_ACTIONS.HUNDRED:
      case ALLOWED_ACTIONS.THOUSAND:
        this.concatDigits(action)
        break
      default:
        break
    }
  }

  private digitPressed(digit: number): void {
    const top = this.stack.pop()
    if (isOperator(top)) {
      this.stack.push(top)
      this.stack.push(digit)
    } else {
      const value = applyNumericKey(top as number, digit)
      this.setOrPush(value)
    }
  }

  private setOrPush(value: number): void {
    if (this.stack.size() == 1) {
      this.stack.reset(value)
    } else {
      this.stack.push(value)
    }
  }

  private operatorPressed(operator: string): void {
    const top = this.stack.pop()
    if (isOperator(top)) {
      this.stack.push(operator)
    } else {
      this.setOrPush(top as number)
      this.eval()
      this.stack.push(operator)
    }
  }

  private eval(): void {
    const top = this.stack.peek()
    if (isOperator(top)) {
      this.stack.pop()
    }
    const value = eval(this.getDisplay())
    this.stack.reset(value)
  }

  private backspace(): void {
    const top = this.stack.pop()
    if (isOperator(top) || ((top as number) < 10 && this.stack.size() > 1)) {
      return
    } else {
      let stringValue = `${DEFAULT_STACK_VALUE}${top}`
      stringValue = stringValue.substring(0, stringValue.length - 1)
      const value = parseInt(stringValue)
      this.setOrPush(value)
    }
  }

  private concatDigits(digits: string): void {
    const top = this.stack.pop()
    let number = top
    if (isOperator(top)) {
      this.stack.push(top)
      number = DEFAULT_STACK_VALUE
    }
    number = parseInt(`${number}${digits}`)
    this.stack.push(number)
  }
}
