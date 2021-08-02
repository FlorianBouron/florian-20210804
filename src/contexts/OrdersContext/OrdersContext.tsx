import React from 'react';

const ACTIONS = {
  UPDATE_ORDERS: 'ORDERS/UPDATE_ORDERS',
};

type transactionType = [price: number, size: number];

type transactionWithPriceType = [price: number, size: number, total: number];

type ordersType = {
  asks: transactionWithPriceType[];
  bids: transactionWithPriceType[];
};
type payloadType = {
  asks: transactionType[] | [];
  bids: transactionType[] | [];
};

type actionType = {
  type: 'ORDERS/UPDATE_ORDERS';
  payload: payloadType;
};

type contextType = {
  orders: ordersType;
  setOrders: (payload: payloadType) => void;
};

const initialOrdersState: ordersType = {
  asks: [],
  bids: [],
};

const CountContext = React.createContext<contextType>({
  orders: initialOrdersState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setOrders: () => {},
});

/*
  This function cleans and merges the transactions (asks and bids)
*/
const updateTransaction = (
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
const orderTransaction = (transactions: transactionType[]): transactionType[] => transactions.sort((a, b) => a[0] - b[0]);

/*
  This function calculate prices of the transactions (asks and bids)
*/
const calculatePrices = (transactions: transactionType[]): transactionWithPriceType[] => {
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
const groupBySelectedMarketTick = (
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
const firstResults = (transactions: transactionType[]): transactionType[] => transactions.splice(0, 16);

function ordersReducer(state: ordersType, { type, payload }: actionType): ordersType {
  switch (type) {
    case ACTIONS.UPDATE_ORDERS: {
      const { asks, bids } = payload;
      return {
        asks: calculatePrices(
          firstResults(
            groupBySelectedMarketTick(orderTransaction(updateTransaction(asks, state.asks)), 0.5),
          ),
        ),
        bids: calculatePrices(
          firstResults(
            groupBySelectedMarketTick(orderTransaction(updateTransaction(bids, state.bids)), 0.5),
          ),
        ),
      };
    }
    default:
      return state;
  }
}

function OrdersProvider({ children }: { children: React.ReactNode }): JSX.Element {
  const [state, dispatch] = React.useReducer(ordersReducer, initialOrdersState);

  const setOrders = (payload: payloadType): void => {
    dispatch({ type: 'ORDERS/UPDATE_ORDERS', payload });
  };

  const value: contextType = {
    orders: state,
    setOrders,
  };

  return <CountContext.Provider value={value}>{children}</CountContext.Provider>;
}

function useOrders(): contextType {
  const context = React.useContext(CountContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within a OrdersProvider');
  }
  return context;
}

export { OrdersProvider, useOrders };
