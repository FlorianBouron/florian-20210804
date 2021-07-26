import { Table as TableMaterial } from '@material-ui/core';
import TableHead from '../TableHead';
import TableBody from '../TableBody';
import TableSideType from '../../../enums/tableSideType';

type TableProps = {
  type: TableSideType;
};

export default function Table({ type }: TableProps): JSX.Element {
  return (
    <TableMaterial>
      <TableHead type={type} />
      <TableBody />
    </TableMaterial>
  );
}
