import React from 'react';
import { Grid } from '@material-ui/core';
import Table from '../../molecules/Table';
import TableSideType from '../../../enums/tableSideType';
import Header from '../../templates/Header';
import { marketType } from '../../../constants/markets';

type HeaderProps = {
  market: marketType;
};

function OrderBook({ market }: HeaderProps): JSX.Element {
  return (
    <Grid container>
      <Grid container justifyContent="space-between" alignItems="center">
        <Header market={market} />
      </Grid>
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
