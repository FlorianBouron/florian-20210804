import React from 'react';
import { Grid } from '@material-ui/core';
import Table from '../../molecules/Table';
import TableSideType from '../../../enums/tableSideType';

function OrderBook(): JSX.Element {
  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Table type={TableSideType.BIDS} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Table type={TableSideType.ASKS} />
      </Grid>
    </Grid>
  );
}

export default React.memo(OrderBook);
