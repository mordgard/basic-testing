// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  const mocked = jest.fn();

  return {
    ...originalModule,
    mockOne: mocked,
    mockTwo: mocked,
    mockThree: mocked,
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();
  });
});
