import { TableRow, TableBody as TableBodyMaterial, TableCell } from '@material-ui/core';
import { useOrders } from '../../../contexts/OrdersContext';
import TableSideType from '../../../enums/tableSideType';
import { green, red } from '../../../constants/colors';

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
            <TableCell
              size="small"
              align="center"
              style={{
                color: type !== TableSideType.BIDS ? red : undefined,
              }}
            >
              {type === TableSideType.BIDS ? total : price}
            </TableCell>
            <TableCell size="small" align="center">
              {size}
            </TableCell>
            <TableCell
              size="small"
              align="center"
              style={{
                color: type === TableSideType.BIDS ? green : undefined,
              }}
            >
              {type === TableSideType.BIDS ? price : total}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBodyMaterial>
  );
}
