import { TableRow as TableRowMaterial } from '@material-ui/core';
import TableSideType from '../../../enums/tableSideType';
import { greenDark, redDark } from '../../../constants/colors';

type TableRowProps = {
  children: React.ReactNode[];
  type: TableSideType;
  depth: number;
};

export default function TableRow({ children, type, depth }: TableRowProps): JSX.Element {
  let direction = '-90deg';
  let color = greenDark;
  if (type !== TableSideType.BIDS) {
    direction = '90deg';
    color = redDark;
  }
  return (
    <TableRowMaterial
      style={{
        background: `linear-gradient(${direction}, ${color}, ${color} ${depth}%, transparent ${depth}%)`,
      }}
    >
      {children}
    </TableRowMaterial>
  );
}
