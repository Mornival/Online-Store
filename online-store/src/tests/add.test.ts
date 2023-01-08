import {describe, expect, test} from '@jest/globals';

function add(a:number, b:number):number {
    return a+b;
}

describe('When given 2 numbers', () => {
    it('returns the sum of those 2 numbers', () => {
      const result = add(10, 5)
      const expected = 15
  
      expect(result).toEqual(expected)
    })
  })