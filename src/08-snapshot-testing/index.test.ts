import { generateLinkedList } from './index';

const expectedList = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: {
          value: null,
          next: null,
        },
      },
    },
  },
};

const values = [1, 2, 3, 4];

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const result = generateLinkedList(values);

    expect(result).toStrictEqual(expectedList);
  });

  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(values);

    expect(result).toMatchSnapshot();
  });
});
