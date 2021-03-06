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
import { XBTUSD_GROUP, ETHUSD_GROUP } from '../../../constants/groups';
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
  const { group, updateGroup } = useGroup();
  const [market, setMarket] = useState<marketType>(XBTUSD);
  const [isSocketClosed, setIsSocketClosed] = useState(false);

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
    isSocketClosed,
  });

  const handleChangeMarket = (): void => {
    setMarket((prevState) => {
      updateGroup(prevState === XBTUSD ? ETHUSD_GROUP[0] : XBTUSD_GROUP[0]);
      return prevState === XBTUSD ? ETHUSD : XBTUSD;
    });
  };

  const handleKillFeed = (): void => {
    if (isSocketClosed === false) {
      closeSocket();
    }
    setIsSocketClosed((prevState) => !prevState);
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      <OrderBook market={market} isSocketClosed={isSocketClosed} />
      <Footer
        onKillFeed={handleKillFeed}
        onChangeMarket={handleChangeMarket}
        isSocketClosed={isSocketClosed}
      />
    </Container>
  );
}
