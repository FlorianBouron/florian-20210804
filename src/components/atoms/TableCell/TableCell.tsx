import { TableCell as TableCellMaterial } from '@material-ui/core';
import TableSideType from '../../../enums/tableSideType';
import { green, red } from '../../../constants/colors';

type TableCellProps = {
  children: React.ReactNode;
  type: TableSideType;
  isPrice: boolean;
};

export default function TableCell({ children, type, isPrice }: TableCellProps): JSX.Element {
  return (
    <TableCellMaterial
      size="small"
      align="center"
      style={{
        color: isPrice ? (type === TableSideType.BIDS ? green : red) : undefined,
        borderBottom: 'none',
      }}
    >
      {children}
    </TableCellMaterial>
  );
}
