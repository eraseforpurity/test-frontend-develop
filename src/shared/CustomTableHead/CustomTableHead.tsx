import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IRemixGetDto } from '../../graphql/types/_server';
import { tableHeadCells } from './constants';

type ICustomTableHead = {
  remixesPayload: IRemixGetDto;
  handleSortingClick: (cell: string) => void;
};

const CustomTableHead = ({ remixesPayload, handleSortingClick }: ICustomTableHead) => {
  const isActive = (cell: string) => {
    if (remixesPayload.sorts?.length) {
      const obj = remixesPayload.sorts[0];
      return obj.columnName === cell;
    }
    return false;
  };

  const currentDirection = () => {
    if (remixesPayload.sorts?.length) {
      const obj = remixesPayload.sorts[0];
      return obj.direction;
    }
    return 'asc';
  };

  return (
    <TableHead>
      <TableRow>
        {tableHeadCells.map((cell) => (
          <TableCell key={cell.columnName}>
            <TableSortLabel
              active={isActive(cell.columnName)}
              direction={currentDirection()}
              onClick={() => handleSortingClick(cell.columnName)}
            />
            {cell.columnName}
          </TableCell>
        ))}

        <TableCell align="center">isStore</TableCell>
        <TableCell align="center">Actions</TableCell>
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHead;
