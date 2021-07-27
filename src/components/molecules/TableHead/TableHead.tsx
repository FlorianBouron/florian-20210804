import { TableHead as TableHeadMaterial, TableRow, TableCell } from '@material-ui/core';
import TableSideType from '../../../enums/tableSideType';
import { headerValues } from '../../../constants/table';

type TableProps = {
  type: TableSideType;
};

export default function TableHead({ type }: TableProps): JSX.Element {
  const headers = type === TableSideType.BIDS ? headerValues : [...headerValues].reverse();
  return (
    <TableHeadMaterial>
      <TableRow>
        {headers.map((header) => (
          <TableCell size="small" align="center" key={header}>
            {header}
          </TableCell>
        ))}
      </TableRow>
    </TableHeadMaterial>
  );
}
