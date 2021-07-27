import React from 'react';

const ACTIONS = {
  UPDATE_ORDERS: 'ORDERS/UPDATE_ORDERS',
};

type ordersType = {
  asks: { [key: number]: number };
  bids: { [key: number]: number };
};
type payloadType = {
  asks: [[price: number, size: number]] | [];
  bids: [[price: number, size: number]] | [];
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
  asks: {},
  bids: {},
};

const CountContext = React.createContext<contextType>({
  orders: initialOrdersState,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setOrders: () => {},
});

function ordersReducer(state: ordersType, { type, payload }: actionType): ordersType {
  switch (type) {
    case ACTIONS.UPDATE_ORDERS: {
      const { asks, bids } = payload;
      const asksObject: { [key: number]: number } = {};
      const bidsObject: { [key: number]: number } = {};
      asks.forEach((ask) => {
        const [price, size] = ask;
        asksObject[price] = size;
      });
      bids.forEach((bid) => {
        const [price, size] = bid;
        bidsObject[price] = size;
      });
      const newAsks = { ...state.asks, ...asksObject };
      const newBids = { ...state.bids, ...bidsObject };
      return { asks: newAsks, bids: newBids };
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
