import { transactionType, transactionWithPriceType } from '../types/transaction';

/*
  This function cleans and merges the transactions (asks and bids)
*/
export const updateTransaction = (
  newTransactions: transactionType[],
  previousTransactions: transactionWithPriceType[],
): transactionType[] => {
  const previousTransactionsObj: { [key: number]: number } = {};
  previousTransactions.forEach((transaction) => {
    const [price, size] = transaction;
    previousTransactionsObj[price] = size;
  });

  newTransactions.forEach((transaction) => {
    const [price, size] = transaction;
    if (size === 0) {
      delete previousTransactionsObj[price];
    } else {
      previousTransactionsObj[price] = size;
    }
  });

  return Object.keys(previousTransactionsObj).map((price) => {
    const priceNumber = Number(price);
    return [priceNumber, previousTransactionsObj[priceNumber]];
  });
};

/*
    This function orders the transactions (asks and bids)
  */
// eslint-disable-next-line max-len
export const orderTransaction = (transactions: transactionType[]): transactionType[] => transactions.sort((a, b) => a[0] - b[0]);

/*
    This function calculate prices of the transactions (asks and bids)
  */
export const calculatePrices = (transactions: transactionType[]): transactionWithPriceType[] => {
  const transactionsWithPrices: transactionWithPriceType[] = [];
  transactions.forEach((transaction: transactionType) => {
    const [price, size] = transaction;
    const previousTransaction = transactionsWithPrices[transactionsWithPrices.length - 1];
    const total = previousTransaction ? previousTransaction[2] + size : size;
    transactionsWithPrices.push([price, size, total]);
  });
  return transactionsWithPrices;
};

/*
    This function floor a value by step
  */
const floorByStep = (value: number, step: number): number => Math.floor(value / step) * step;

/*
    This function will group data by market size
    E.g. if we change our grouping from 0.5 to 1 then we would combine the data from prices
    1000 and 1000.5 and display it under a single level: the price 1000.
  */
export const groupBySelectedMarketTick = (
  transactions: transactionType[],
  group: number,
): transactionType[] => {
  const newTransactions: transactionType[] = [];
  transactions.forEach((transaction: transactionType) => {
    const [price, size] = transaction;
    const priceGroup = floorByStep(Number(price), group);
    const previousTransaction = newTransactions[newTransactions.length - 1];

    if (previousTransaction) {
      const [previousPrice, previousSize] = previousTransaction;
      const previousPriceGroup = floorByStep(Number(previousPrice), group);

      if (priceGroup === previousPriceGroup) {
        // Remove the last value in newTransaction
        newTransactions.splice(0, newTransactions.length - 1);
        // Add the new grouped value
        newTransactions.push([previousPrice, previousSize + size]);
      } else {
        newTransactions.push(transaction);
      }
    } else {
      newTransactions.push(transaction);
    }
  });

  return newTransactions;
};

/*
    This function returns the first 16th results
  */
// eslint-disable-next-line max-len
export const firstResults = (transactions: transactionType[]): transactionType[] => transactions.splice(0, 16);
