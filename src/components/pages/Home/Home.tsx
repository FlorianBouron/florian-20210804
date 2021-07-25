import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Footer from '../../templates/Footer';
import OrderBook from '../../organisms/OrderBook';
import { grayDark } from '../../../constants/colors';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: grayDark,
    padding: '2px',
  },
}));

export default function Home(): JSX.Element {
  const classes = useStyles();
  return (
    <Container maxWidth="sm" className={classes.root}>
      <OrderBook />
      <Footer />
    </Container>
  );
}
