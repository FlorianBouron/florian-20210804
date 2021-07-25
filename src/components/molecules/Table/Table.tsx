import {
  Table as TableMaterial,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@material-ui/core';
import { headerValues } from '../../../constants/table';

export default function Table(): JSX.Element {
  return (
    <TableMaterial>
      <TableHead>
        <TableRow>
          {headerValues.map((header) => (
            <TableCell size="small" align="center" key={header}>
              {header}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
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
