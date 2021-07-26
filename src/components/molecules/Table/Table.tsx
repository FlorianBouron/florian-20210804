import {
  Table as TableMaterial, TableRow, TableBody, TableCell,
} from '@material-ui/core';
import TableHead from '../TableHead';
import { headerValues } from '../../../constants/table';
import TableSideType from '../../../enums/tableSideType';

type TableProps = {
  type: TableSideType;
};

export default function Table({ type }: TableProps): JSX.Element {
  return (
    <TableMaterial>
      <TableHead type={type} />
      <TableBody>
        <TableRow>
          {headerValues.map((header) => (
            <TableCell size="small" align="center" key={`non-header${header}`}>
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableBody>
    </TableMaterial>
  );
}
