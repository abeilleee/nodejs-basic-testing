import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 22, b: 11, action: Action.Add });
    expect(result).toBe(33);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 12, b: 6, action: Action.Subtract });
    expect(result).toBe(6);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 22, b: 2, action: Action.Multiply });
    expect(result).toBe(44);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({
      a: 12,
      b: 3,
      action: Action.Divide,
    });
    expect(result).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: 'someAction',
    });
    expect(result).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: 2,
      b: '22',
      action: Action.Add,
    });
    expect(result).toBeNull();
  });
});
