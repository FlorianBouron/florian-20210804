import { Container } from '@material-ui/core';
import Footer from '../../templates/Footer';
import OrderBook from '../../organisms/OrderBook';

export default function Home(): JSX.Element {
  return (
    <Container maxWidth="sm">
      <OrderBook />
      <Footer />
    </Container>
  );
}
