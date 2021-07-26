/* eslint-disable no-console */
import { Grid } from '@material-ui/core';
import Table from '../../molecules/Table';
import useSocket from '../../../hooks/useSocket';
import { endpoint, message } from '../../../constants/socket';

export default function OrderBook(): JSX.Element {
  const { closeSocket } = useSocket({
    url: endpoint,
    message,
    onError: (_message: string) => console.log(_message),
    onMessage: (res: MessageEvent) => console.log(JSON.parse(res.data)),
  });
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Table />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Table />
      </Grid>
    </Grid>
  );
}
