import { TableBody as TableBodyMaterial } from '@material-ui/core';
import TableRow from '../../atoms/TableRow';
import TableCell from '../../atoms/TableCell';
import { useOrders } from '../../../contexts/OrdersContext';
import TableSideType from '../../../enums/tableSideType';
import { formatNumber } from '../../../utils/formatNumber';

type TableBodyProps = {
  type: TableSideType;
};

export default function TableBody({ type }: TableBodyProps): JSX.Element {
  const { orders } = useOrders();
  const rows = orders[type];
  return (
    <TableBodyMaterial>
      {rows.map((row): JSX.Element => {
        const [price, size, total]: number[] = row;
        const formattedPrice = formatNumber(price, true);
        const formattedSize = formatNumber(size);
        const formattedTotal = formatNumber(total);

        return (
          <TableRow
            key={`${price}-${size}`}
            type={type}
            depth={Math.round((total / rows[rows.length - 1][2]) * 100)}
          >
            <TableCell type={type} isPrice={type !== TableSideType.BIDS}>
              {type === TableSideType.BIDS ? formattedTotal : formattedPrice}
            </TableCell>
            <TableCell type={type} isPrice={false}>
              {formattedSize}
            </TableCell>
            <TableCell type={type} isPrice={type === TableSideType.BIDS}>
              {type === TableSideType.BIDS ? formattedPrice : formattedTotal}
            </TableCell>
          </TableRow>
        );
      })}
    </TableBodyMaterial>
  );
}
