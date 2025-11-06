import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 4, b: 2, action: Action.Subtract, expected: 2 },
  { a: 5, b: 2, action: Action.Multiply, expected: 10 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 7, b: 2, action: Action.Exponentiate, expected: 49 },
  { a: '22', b: 2, action: Action.Add, expected: null },
  { a: 22, b: 2, action: 'someAction', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return $expected for a=$a, b=$b and action=$action',
    ({ a, b, action, expected }) =>
      expect(simpleCalculator({ a, b, action })).toBe(expected),
  );
});
