import { Calculator } from '@/domain/calculator'
import type { KeyValue } from '@/domain/key-metadata'
import { describe, expect, test } from 'vitest'

const pressMultipleKeys = (calc: Calculator, keys: KeyValue[]) =>
  keys.forEach((key) => calc.keyPressed(key))

describe('Calculator tests', () => {
  test('Should create with default value 0', () => {
    const calc = new Calculator()
    expect(calc.getDisplay()).toBe('0')
    expect(calc.getValue()).toBe(0)
  })

  test('Should execute valid arithmetic operations', () => {
    for (let i = 0; i <= 10; i++) {
      for (let j = 0; j <= 10; j++) {
        let calc = new Calculator()
        calc.keyPressed(i)
        expect(calc.getDisplay()).toBe(`${i}`)
        expect(calc.getValue()).toBe(i)

        calc.keyPressed('+')
        expect(calc.getDisplay()).toBe(`${i} +`)
        expect(calc.getValue()).toBe(i)

        calc.keyPressed(j)
        expect(calc.getDisplay()).toBe(`${i} + ${j}`)
        expect(calc.getValue()).toBe(i)

        calc.keyPressed('ENTER')
        expect(calc.getDisplay()).toBe(`${i + j}`)
        expect(calc.getValue()).toBe(i + j)

        calc = new Calculator()
        calc.keyPressed(i)
        expect(calc.getDisplay()).toBe(`${i}`)
        expect(calc.getValue()).toBe(i)

        calc.keyPressed('*')
        expect(calc.getDisplay()).toBe(`${i} *`)
        expect(calc.getValue()).toBe(i)

        calc.keyPressed(j)
        expect(calc.getDisplay()).toBe(`${i} * ${j}`)
        expect(calc.getValue()).toBe(i)

        calc.keyPressed('ENTER')
        expect(calc.getDisplay()).toBe(`${i * j}`)
        expect(calc.getValue()).toBe(i * j)

        calc = new Calculator()
        calc.keyPressed(i)
        expect(calc.getDisplay()).toBe(`${i}`)
        expect(calc.getValue()).toBe(i)

        calc.keyPressed('-')
        expect(calc.getDisplay()).toBe(`${i} -`)
        expect(calc.getValue()).toBe(i)

        calc.keyPressed(j)
        expect(calc.getDisplay()).toBe(`${i} - ${j}`)
        expect(calc.getValue()).toBe(i)

        calc.keyPressed('ENTER')
        expect(calc.getDisplay()).toBe(`${i - j}`)
        expect(calc.getValue()).toBe(i - j)
      }
    }
  })

  test.each([
    { keys: [5, 3, '-', 3, '*'], result: 50 },
    { keys: [1, '+', 2, '-', 3, '*', 9, '+'], result: 0 },
    { keys: [1, '+', '00', '-', 3, '-'], result: -2 },
    { keys: [5, 3, '-', 3], result: 50 },
    { keys: [1, '+', 2, '-', 3, '*', 9], result: 0 },
    { keys: [1, '+', '00', '-', 3], result: -2 },
    { keys: [1, '00', '-', 3], result: 97 },
    { keys: [1, '00', '000', '-', 3], result: 99997 },
    { keys: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0], result: 1234567890 },
    { keys: [9, '*', 9, '-', 1, '*', 2, '-', 1, 6, 0], result: 0 }
  ])('Should execute mixed arithmetic operations with result: $result', ({ keys, result }) => {
    const calc = new Calculator()
    pressMultipleKeys(calc, keys)
    calc.keyPressed('ENTER')
    expect(calc.getDisplay()).toBe(`${result}`)
    expect(calc.getValue()).toBe(result)
  })

  test.each([
    { keys: [1, '*', '+'], result: 1, display: '1 +' },
    { keys: [1, '+', '-'], result: 1, display: '1 -' },
    { keys: [1, '-', '*'], result: 1, display: '1 *' },
    { keys: [1, '*', '-', '+'], result: 1, display: '1 +' },
    { keys: [1, '-', '*', '-'], result: 1, display: '1 -' },
    { keys: [1, '*', '*', '*'], result: 1, display: '1 *' }
  ])(
    'Subsequent operators change the latest one with display=$display',
    ({ keys, result, display }) => {
      const calc = new Calculator()
      pressMultipleKeys(calc, keys)
      expect(calc.getDisplay()).toBe(`${display}`)
      calc.keyPressed('ENTER')
      expect(calc.getValue()).toBe(result)
    }
  )

  test('Backspace deletes item by item from display', () => {
    const calc = new Calculator()
    const keys = [9, '*', 9, '-', 1, '*', 2, '-', 1, 6, 0]
    pressMultipleKeys(calc, keys)
    expect(calc.getDisplay()).toBe('160 - 160')

    calc.keyPressed('BACKSPACE')
    expect(calc.getDisplay()).toBe('160 - 16')
    calc.keyPressed('BACKSPACE')
    expect(calc.getDisplay()).toBe('160 - 1')
    calc.keyPressed('BACKSPACE')
    expect(calc.getDisplay()).toBe('160 -')
    calc.keyPressed('BACKSPACE')
    expect(calc.getDisplay()).toBe('160')
    calc.keyPressed('BACKSPACE')
    expect(calc.getDisplay()).toBe('16')
    calc.keyPressed('BACKSPACE')
    expect(calc.getDisplay()).toBe('1')
    calc.keyPressed('BACKSPACE')
    expect(calc.getDisplay()).toBe('0')
  })

  test('Backspace deletes item by item from display', () => {
    const calc = new Calculator()
    const keys = [9, '*', 9, '-', 1, '*', 2, '-', 1, 6, 0]
    pressMultipleKeys(calc, keys)
    expect(calc.getDisplay()).toBe('160 - 160')

    calc.keyPressed('BACKSPACE')
    expect(calc.getDisplay()).toBe('160 - 16')
    calc.keyPressed('BACKSPACE')
    expect(calc.getDisplay()).toBe('160 - 1')
    calc.keyPressed('BACKSPACE')
    expect(calc.getDisplay()).toBe('160 -')
    calc.keyPressed('BACKSPACE')
    expect(calc.getDisplay()).toBe('160')
    calc.keyPressed('BACKSPACE')
    expect(calc.getDisplay()).toBe('16')
    calc.keyPressed('BACKSPACE')
    expect(calc.getDisplay()).toBe('1')
    calc.keyPressed('BACKSPACE')
    expect(calc.getDisplay()).toBe('0')
  })

  test('Non allowed actions or operators are processed', () => {
    const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const specialCharacters = '!@#$%^&()_=[]{};:"|,.<>?'

    const invalidKeys: string[] = [
      letters,
      specialCharacters,
      ...letters.split(''),
      ...specialCharacters.split(''),
      '',
      '++',
      '--',
      ' ',
      '\\t',
      '\\n'
    ]

    const calc = new Calculator()
    calc.keyPressed(1)
    invalidKeys.forEach((key: string) => {
      calc.keyPressed(key)
      expect(calc.getDisplay()).toBe('1')
      expect(calc.getValue()).toBe(1)
    })
  })
})
