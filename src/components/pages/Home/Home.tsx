/* eslint-disable no-console */
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Footer from '../../templates/Footer';
import OrderBook from '../../organisms/OrderBook';
import useSocket from '../../../hooks/useSocket';
import { useGroup } from '../../../contexts/GroupContext';
import { useOrders } from '../../../contexts/OrdersContext';
import { endpoint, message } from '../../../constants/socket';
import { grayDark } from '../../../constants/colors';
import { XBTUSD, ETHUSD } from '../../../constants/markets';
import { marketType } from '../../../types/market';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: grayDark,
    padding: '2px',
  },
}));

export default function Home(): JSX.Element {
  const classes = useStyles();
  const { setOrders } = useOrders();
  const { group } = useGroup();
  const [market, setMarket] = useState<marketType>(XBTUSD);

  const onMessage = (res: MessageEvent): void => {
    const { asks, bids } = JSON.parse(res.data);
    if (asks || bids) {
      const payload = {
        asks,
        bids,
        group,
      };
      setOrders(payload);
    }
  };

  const { closeSocket } = useSocket({
    url: endpoint,
    message:
      market === XBTUSD
        ? message
        : {
          ...message,
          ...{ product_ids: [ETHUSD] },
        },
    onError: (_message: string) => console.log(_message),
    onMessage,
    group,
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
