import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IRemixGetDto } from '../../graphql/types/_server';
import { tableHeadCells } from './constants';
import { styles } from './styles';

type CustomTableHeadProps = {
  remixesPayload: IRemixGetDto;
  handleSortingClick: (cell: string) => void;
};

const CustomTableHead = ({ remixesPayload, handleSortingClick }: CustomTableHeadProps) => {
  const isActive = (cell: string) => {
    if (remixesPayload.sorts?.length) {
      const obj = remixesPayload.sorts[0];
      return obj.columnName === cell;
    }
    return false;
  };

  const currentDirection = (name: string) => {
    if (remixesPayload.sorts?.length) {
      const obj = remixesPayload.sorts[0];
      if (obj.columnName === name) return obj.direction;
    }
    return 'asc';
  };

  return (
    <TableHead sx={styles.tableHead}>
      <TableRow>
        {tableHeadCells.map((cell) => (
          <TableCell
            sx={styles.tableHeadCell}
            onClick={() => handleSortingClick(cell.columnName)}
            align="center"
            key={cell.columnName}
          >
            <TableSortLabel
              active={isActive(cell.columnName)}
              direction={currentDirection(cell.columnName)}
            />

            {cell.label}
          </TableCell>
        ))}

        <TableCell align="center">Available in Store</TableCell>

        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHead;
