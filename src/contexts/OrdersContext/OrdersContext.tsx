import React from 'react';
import { transactionType, transactionWithPriceType } from '../../types/transaction';
import {
  updateTransaction,
  orderTransaction,
  groupBySelectedMarketTick,
  firstResults,
  calculatePrices,
} from '../../utils/orders';

const ACTIONS = {
  UPDATE_ORDERS: 'ORDERS/UPDATE_ORDERS',
};

type ordersType = {
  asks: transactionWithPriceType[];
  bids: transactionWithPriceType[];
};
type payloadType = {
  asks: transactionType[] | [];
  bids: transactionType[] | [];
  group: number;
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

function ordersReducer(state: ordersType, { type, payload }: actionType): ordersType {
  switch (type) {
    case ACTIONS.UPDATE_ORDERS: {
      const { asks, bids, group } = payload;
      return {
        asks: calculatePrices(
          firstResults(
            groupBySelectedMarketTick(orderTransaction(updateTransaction(asks, state.asks)), group),
          ),
        ),
        bids: calculatePrices(
          firstResults(
            groupBySelectedMarketTick(orderTransaction(updateTransaction(bids, state.bids)), group),
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
