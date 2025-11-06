import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('lodash', () => ({
  throttle: jest.fn((func) => func),
}));

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const baseURL = 'https://jsonplaceholder.typicode.com';
  const relativePath = '/users/2';
  const mockedData = { id: '2', username: 'Antonette' };
  let mockGet: jest.Mock;

  beforeEach(() => {
    mockGet = jest.fn().mockResolvedValue({ data: mockedData });
    (axios.create as jest.Mock).mockReturnValue({ get: mockGet });
    jest.restoreAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({ baseURL });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(mockGet).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(mockedData);
  });
});
