import { TableBody as TableBodyMaterial } from '@material-ui/core';
import TableRow from '../../atoms/TableRow';
import TableCell from '../../atoms/TableCell';
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
          <TableRow
            key={`${type}-${price}`}
            type={type}
            depth={Math.round((total / rows[rows.length - 1][2]) * 100)}
          >
            <TableCell type={type} isPrice={type !== TableSideType.BIDS}>
              {type === TableSideType.BIDS ? total : price}
            </TableCell>
            <TableCell type={type} isPrice={false}>
              {size}
            </TableCell>
            <TableCell type={type} isPrice={type === TableSideType.BIDS}>
              {type === TableSideType.BIDS ? price : total}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBodyMaterial>
  );
}
