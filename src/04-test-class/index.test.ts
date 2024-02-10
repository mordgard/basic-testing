// Uncomment the code below and write your tests
import {
  BankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

import _ from 'lodash';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 500;
    const account = getBankAccount(initialBalance);

    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 500;
    const account = getBankAccount(initialBalance);

    expect(() => account.withdraw(600)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 500;
    const sourceAccount = getBankAccount(initialBalance);
    const targetAccount = getBankAccount(initialBalance);

    expect(() => sourceAccount.transfer(600, targetAccount)).toThrowError(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 500;
    const account = getBankAccount(initialBalance);

    expect(() => account.transfer(600, account)).toThrowError(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const initialBalance = 500;
    const depositAmount = 100;
    const account = getBankAccount(initialBalance);
    account.deposit(depositAmount);

    expect(account.getBalance()).toBe(initialBalance + depositAmount);
  });

  test('should withdraw money', () => {
    const initialBalance = 500;
    const wdAmount = 100;
    const account = getBankAccount(initialBalance);
    account.withdraw(wdAmount);

    expect(account.getBalance()).toBe(initialBalance - wdAmount);
  });

  test('should transfer money', () => {
    const initialBalance = 500;
    const transferAmount = 400;
    const sourceAccount = getBankAccount(initialBalance);
    const targetAccount = getBankAccount(initialBalance);

    sourceAccount.transfer(transferAmount, targetAccount);

    expect(sourceAccount.getBalance()).toBe(initialBalance - transferAmount);
    expect(targetAccount.getBalance()).toBe(initialBalance + transferAmount);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 500;
    const account = getBankAccount(initialBalance);

    jest.spyOn(_, 'random').mockImplementation(() => initialBalance);

    const balance = await account.fetchBalance();

    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 500;
    const account = getBankAccount(initialBalance);

    jest.spyOn(_, 'random').mockImplementation(() => initialBalance);

    const balance = await account.fetchBalance();

    expect(account.getBalance()).toBe(balance);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 500;
    const account = getBankAccount(initialBalance);

    jest
      .spyOn(BankAccount.prototype, 'fetchBalance')
      .mockImplementation(() => Promise.resolve(null));

    try {
      await account.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
