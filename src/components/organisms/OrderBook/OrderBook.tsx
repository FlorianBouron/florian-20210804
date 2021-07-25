import { Grid } from '@material-ui/core';
import Table from '../../molecules/Table';

export default function OrderBook(): JSX.Element {
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
