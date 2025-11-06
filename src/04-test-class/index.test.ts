import lodash from 'lodash';
import {
  BankAccount,
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';

describe('BankAccount', () => {
  const initialBalance = 2222;
  let account: BankAccount;

  beforeEach(() => {
    account = getBankAccount(initialBalance);
  });

  afterEach(() => jest.restoreAllMocks());

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const withdrawAmount = 3325;

    expect(() => account.withdraw(withdrawAmount)).toThrow(
      new InsufficientFundsError(initialBalance),
    );
  });

  test('should throw error when transferring more than balance', () => {
    const transferAmount = 3333;
    const secondAccountInitialBalance = 1000;
    const secondAccount = new BankAccount(secondAccountInitialBalance);

    expect(() => account.transfer(transferAmount, secondAccount)).toThrow(
      new InsufficientFundsError(initialBalance),
    );
  });

  test('should throw error when transferring to the same account', () => {
    const transferAmount = 100;

    expect(() => account.transfer(transferAmount, account)).toThrow(
      new TransferFailedError(),
    );
  });

  test('should deposit money', () => {
    const amount = 1000;
    const expectedBalance = initialBalance + amount;
    account.deposit(amount);

    expect(account.getBalance()).toBe(expectedBalance);
  });

  test('should withdraw money', () => {
    const amount = 200;
    const expectedBalance = initialBalance - amount;
    account.withdraw(amount);

    expect(account.getBalance()).toBe(expectedBalance);
  });

  test('should transfer money', () => {
    const transferAmount = 100;
    const secondAccountInitialBalance = 1000;
    const expectedBalance = account.getBalance() - transferAmount;
    const secondAccount = new BankAccount(secondAccountInitialBalance);
    account.transfer(transferAmount, secondAccount);

    expect(account.getBalance()).toBe(expectedBalance);
    expect(secondAccount.getBalance()).toBe(
      secondAccountInitialBalance + transferAmount,
    );
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mockedValue = 22;
    jest.spyOn(lodash, 'random').mockReturnValue(mockedValue);
    const balance = await account.fetchBalance();

    expect(balance).toBe(mockedValue);
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mockedValue = 1222;

    jest.spyOn(lodash, 'random').mockReturnValue(mockedValue);
    await account.synchronizeBalance();

    expect(account.getBalance()).toBe(mockedValue);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
