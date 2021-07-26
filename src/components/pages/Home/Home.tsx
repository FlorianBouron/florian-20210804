/* eslint-disable no-console */
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Footer from '../../templates/Footer';
import OrderBook from '../../organisms/OrderBook';
import useSocket from '../../../hooks/useSocket';
import { endpoint, message } from '../../../constants/socket';
import { grayDark } from '../../../constants/colors';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: grayDark,
    padding: '2px',
  },
}));

export default function Home(): JSX.Element {
  const classes = useStyles();
  const { closeSocket } = useSocket({
    url: endpoint,
    message,
    onError: (_message: string) => console.log(_message),
    onMessage: (res: MessageEvent) => console.log(JSON.parse(res.data)),
  });
  return (
    <Container maxWidth="sm" className={classes.root}>
      <OrderBook />
      <Footer onKillFeed={closeSocket} />
    </Container>
  );
}
