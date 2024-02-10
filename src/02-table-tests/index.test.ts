// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 10, b: 4, action: Action.Subtract, expected: 6 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 10, b: 4, action: Action.Multiply, expected: 40 },
  { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'calculates %d %s %d = %d',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    },
  );
});
