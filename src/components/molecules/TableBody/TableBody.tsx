import { TableRow, TableBody as TableBodyMaterial, TableCell } from '@material-ui/core';
import { useOrders } from '../../../contexts/OrdersContext';
import TableSideType from '../../../enums/tableSideType';

type TableBodyProps = {
  type: TableSideType;
};

export default function TableBody({ type }: TableBodyProps): JSX.Element {
  const { orders } = useOrders();
  const rows = orders[type];
  return (
    <TableBodyMaterial>
      {rows.map((row): JSX.Element => {
        const [price, size, total] = row;
        return (
          <TableRow key={`${type}-${price}`}>
            <TableCell size="small" align="center">
              {type === TableSideType.BIDS ? total : price}
            </TableCell>
            <TableCell size="small" align="center">
              {size}
            </TableCell>
            <TableCell size="small" align="center">
              {type === TableSideType.BIDS ? price : total}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBodyMaterial>
  );
}
