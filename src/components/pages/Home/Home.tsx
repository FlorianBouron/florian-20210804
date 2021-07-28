/* eslint-disable no-console */
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Footer from '../../templates/Footer';
import OrderBook from '../../organisms/OrderBook';
import useSocket from '../../../hooks/useSocket';
import { useOrders } from '../../../contexts/OrdersContext/OrdersContext';
import { endpoint, message } from '../../../constants/socket';
import { grayDark } from '../../../constants/colors';
import { XBTUSD, ETHUSD, marketType } from '../../../constants/markets';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: grayDark,
    padding: '2px',
  },
}));

export default function Home(): JSX.Element {
  const classes = useStyles();
  const { setOrders } = useOrders();
  const [market, setMarket] = useState<marketType>(XBTUSD);

  const onMessage = (res: MessageEvent): void => {
    const { asks, bids } = JSON.parse(res.data);
    if (asks || bids) {
      const payload = {
        asks,
        bids,
      };
      setOrders(payload);
    }
  };

  const { closeSocket } = useSocket({
    url: endpoint,
    message,
    onError: (_message: string) => console.log(_message),
    onMessage,
  });

  const handleChangeMarket = (): void => {
    setMarket((prevState) => (prevState === XBTUSD ? ETHUSD : XBTUSD));
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <OrderBook market={market} />
      <Footer onKillFeed={closeSocket} onChangeMarket={handleChangeMarket} />
    </Container>
  );
}
