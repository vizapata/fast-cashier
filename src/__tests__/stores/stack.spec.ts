import { NotEmptyStack } from '@/domain/stack'
import { describe, expect, it } from 'vitest'

describe('Not Empty Stack', () => {
  it('Does not create empty stack', () => {
    const stack = new NotEmptyStack<string>('test')
    expect(stack.isEmpty()).toBe(false)
    expect(stack.size()).toBe(1)
  })

  it('Stack does not get empty', () => {
    const stack = new NotEmptyStack<string>('test')
    expect(stack.isEmpty()).toBe(false)
    expect(stack.size()).toBe(1)

    let item: string = stack.pop()
    expect(item).toBe('test')
    expect(stack.isEmpty()).toBe(false)
    expect(stack.size()).toBe(1)

    item = stack.pop()
    expect(item).toBe('test')
    expect(stack.isEmpty()).toBe(false)
    expect(stack.size()).toBe(1)
  })

  it('Push adds new values to stack', () => {
    const stack = new NotEmptyStack<string>('test')

    expect(stack.size()).toBe(1)
    stack.push('top item')

    expect(stack.peek()).toBe('top item')
  })

  it('Peek returns top value from without popping', () => {
    const stack = new NotEmptyStack<string>('test')
    stack.push('top item')

    expect(stack.peek()).toBe('top item')
    expect(stack.size()).toBe(2)
  })
})
