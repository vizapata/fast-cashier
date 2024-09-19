export interface Stack<T> {
  push(item: T): void
  pop(): T | undefined
  peek(): T | undefined
  size(): number
  isEmpty(): boolean
}

export class NotEmptyStack<T> implements Stack<T> {
  private stack: Array<T> = []

  constructor(initialItem: T) {
    this.stack.push(initialItem)
  }

  push(item: T): void {
    this.stack.push(item)
  }
  pop(): T {
    return this.size() == 1 ? this.stack[0] : this.stack.pop()!
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
}
