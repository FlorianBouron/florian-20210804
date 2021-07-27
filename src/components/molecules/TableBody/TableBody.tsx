import { TableRow, TableBody as TableBodyMaterial, TableCell } from '@material-ui/core';
import { useOrders } from '../../../contexts/OrdersContext';
import { headerValues } from '../../../constants/table';

export default function TableBody(): JSX.Element {
  const { orders } = useOrders();
  console.log(orders);
  return (
    <TableBodyMaterial>
      <TableRow>
        {headerValues.map((header) => (
          <TableCell size="small" align="center" key={`non-header${header}`}>
            {header}
          </TableCell>
        ))}
      </TableRow>
    </TableBodyMaterial>
  );
}
