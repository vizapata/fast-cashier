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
    expect(stack.values()).toEqual(['test', 'top item'])
    expect(stack.head()).toBe('test')
  })

  it('Peek returns top value from without popping', () => {
    const stack = new NotEmptyStack<string>('test')
    stack.push('top item')

    expect(stack.isEmpty()).toBe(false)
    expect(stack.peek()).toBe('top item')
    expect(stack.size()).toBe(2)
    expect(stack.values()).toEqual(['test', 'top item'])
    expect(stack.head()).toBe('test')
  })

  it('Values method returns the list of items', () => {
    const stack = new NotEmptyStack<string>('test')
    stack.push('stack')
    stack.push('values')

    expect(stack.isEmpty()).toBe(false)
    expect(stack.size()).toBe(3)
    expect(stack.values()).toEqual(['test', 'stack', 'values'])
    expect(stack.head()).toBe('test')
  })

  it('Reset restores the stack value to have the passed item', () => {
    const stack = new NotEmptyStack<string>('test')
    stack.push('stack')
    stack.push('values')

    expect(stack.size()).toBe(3)
    expect(stack.peek()).toBe('values')
    expect(stack.values()).toEqual(['test', 'stack', 'values'])
    expect(stack.head()).toBe('test')

    stack.reset('reset')

    expect(stack.isEmpty()).toBe(false)
    expect(stack.size()).toBe(1)
    expect(stack.values()).toEqual(['reset'])
    expect(stack.head()).toBe('reset')
    expect(stack.peek()).toBe('reset')
  })
})
