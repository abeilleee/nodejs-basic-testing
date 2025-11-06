import fs from 'node:fs';
import path from 'node:path';
import fsPromises from 'node:fs/promises';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByTimeout(callback, timeout);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout);

    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const spy = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    const timeout = 1000;

    doStuffByInterval(callback, timeout);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(callback, timeout);
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    const timeout = 1000;
    const times = 4;

    doStuffByInterval(callback, timeout);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(timeout * times);

    expect(callback).toHaveBeenCalledTimes(times);
  });
});

describe('readFileAsynchronously', () => {
  afterEach(() => jest.restoreAllMocks());

  test('should call join with pathToFile', async () => {
    const spy = jest.spyOn(path, 'join');
    const pathToFile = 'test.md';

    await readFileAsynchronously(pathToFile);

    expect(spy).toHaveBeenCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);
    const pathToFile = 'test.md';
    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'test.md';
    const content = 'some content';
    const buffer = Buffer.from(content);

    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(true);
    jest.spyOn(fsPromises, 'readFile').mockResolvedValueOnce(buffer);

    const result = await readFileAsynchronously(pathToFile);

    expect(result).toBe(content);
  });
});
