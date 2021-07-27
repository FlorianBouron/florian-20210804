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
const orderTransaction = (transactions: transactionType[]): transactionType[] => {
  const orderedTransactions = transactions.sort((a, b) => a[0] - b[0]);
  // We are returning only the first 16th results
  return orderedTransactions.splice(0, 16);
};

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

function ordersReducer(state: ordersType, { type, payload }: actionType): ordersType {
  switch (type) {
    case ACTIONS.UPDATE_ORDERS: {
      const { asks, bids } = payload;
      return {
        asks: calculatePrices(orderTransaction(updateTransaction(asks, state.asks))),
        bids: calculatePrices(orderTransaction(updateTransaction(bids, state.bids))),
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
