export interface Stack<T> {
  push(item: T): void
  pop(): T | undefined
  peek(): T | undefined
  size(): number
  isEmpty(): boolean
}

export class NotEmptyStack<T> implements Stack<T> {
  private stack: Array<T> = []
  private initialValue: T

  constructor(initialItem: T) {
    this.initialValue = initialItem
    this.clear()
  }

  push(item: T): void {
    this.stack.push(item)
  }

  pop(): T {
    const value = this.stack.pop()!
    if (this.isEmpty()) {
      this.clear()
    }
    return value
  }

  peek(): T {
    return this.stack[this.size() - 1]
  }

  size(): number {
    return this.stack.length
  }

  isEmpty(): boolean {
    return this.size() == 0
  }

  values(): T[] {
    return this.stack
  }

  clear(): void {
    this.reset(this.initialValue)
  }

  reset(value: T): void {
    this.stack = [value]
  }

  head(): T {
    return this.stack[0]
  }
}
