import { FC, useCallback, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  Pagination
} from '@mui/material';

import CustomTableHead from '../../shared/CustomTableHead/CustomTableHead';
import { styles } from './styles';

import { IRemixModel, IRemixGetDto, SortDirectionEnum } from '../../graphql/types/_server';
import ModalWindow from '../../shared/ModalWindow/ModalWindow';
import { DELETE_REMIX } from '../../graphql/mutations/mutations';
import { GET_REMIXES } from '../../graphql/queries/queries';
import { initailValuses } from './constants';

const RemixesPage: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number | undefined | null>();
  const [remixesPayload, setRemixesPayload] = useState<IRemixGetDto>(initailValuses);
  const [remixesState, setRemixesDataState] = useState<IRemixModel[] | undefined>();
  const [totalItems, setTotalItems] = useState<number>(0);

  const { loading, data, refetch } = useQuery(GET_REMIXES, {
    variables: { payload: { ...remixesPayload } },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
    onCompleted(data) {
      setRemixesDataState(data.remixes.items);
      setTotalItems(data.remixes.meta.total);
    }
  });
  const [deleteRemix, { loading: loadingOnDelete }] = useMutation(DELETE_REMIX);

  const paginationCount = Math.ceil(totalItems / initailValuses.paginate.take) as number;

  const handleOpen = () => setOpen(true);
  const handleClose = useCallback(
    (withRefecth: boolean) => {
      setId(null);
      setOpen(false);
      withRefecth && refetch({ payload: { ...remixesPayload } });
    },
    [remixesPayload, open, id]
  );

  const handlePaginationShift = () => {
    if (totalItems - 1 === (page - 1) * initailValuses.paginate.take) {
      setPage(1);
      setRemixesPayload((prevState) => ({
        ...prevState,
        paginate: {
          skip: 0,
          take: prevState?.paginate?.take ? prevState?.paginate?.take : initailValuses.paginate.take
        }
      }));
    }
  };

  const handleDeleteRemixClick = useCallback(
    (id: number) => {
      deleteRemix({ variables: { payload: { id } } }).then(() => {
        handlePaginationShift();
        enqueueSnackbar('Row was deleted');
        refetch({ payload: { ...remixesPayload } });
      });
    },
    [remixesPayload, data, totalItems, page]
  );

  const handleEditRemixClick = useCallback(
    (id: number) => {
      setId(id);
      handleOpen();
    },
    [id, open]
  );

  const handlePaginationChange = useCallback(
    (value: number) => {
      setPage(value);
      setRemixesPayload((prevState) => ({
        ...prevState,
        paginate: {
          skip: prevState?.paginate?.take ? prevState.paginate.take * (value - 1) : 0,
          take: prevState?.paginate?.take ? prevState?.paginate?.take : initailValuses.paginate.take
        }
      }));
    },
    [remixesPayload, page]
  );

  const handleSortingClick = useCallback(
    (columnName: string) => {
      setRemixesPayload((prevState) => {
        if (prevState.sorts?.length) {
          const obj = prevState.sorts[0];
          const currentDirection = obj.direction;
          const name = obj.columnName;
          if (currentDirection === SortDirectionEnum.Asc && name === columnName) {
            return { ...prevState, sorts: [{ columnName, direction: SortDirectionEnum.Desc }] };
          }
        }
        return { ...prevState, sorts: [{ columnName, direction: SortDirectionEnum.Asc }] };
      });
    },
    [remixesPayload]
  );
  return (
    <Container sx={styles.container} maxWidth="xl">
      <TableContainer
        sx={loading || loadingOnDelete ? styles.tableContainerOnFetch : styles.tableContainer}
        component={Paper}
      >
        <Table sx={styles.table} aria-label="simple table">
          <CustomTableHead
            remixesPayload={remixesPayload}
            handleSortingClick={handleSortingClick}
          />

          <TableBody>
            {remixesState?.map((row: IRemixModel) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.authorEmail}</TableCell>
                <TableCell align="center">{row.genre}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">{row.trackLength}</TableCell>
                <TableCell align="center">{row.isStore ? 'Yes' : 'No'}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleEditRemixClick(row.id)}
                    sx={styles.editButton}
                    variant="contained"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteRemixClick(row.id)}
                    sx={styles.deleteButton}
                    variant="contained"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Container maxWidth="xl" sx={styles.paginationContainer}>
        <Button onClick={handleOpen} variant="contained">
          Add Row
        </Button>

        <Pagination
          size="small"
          page={page}
          onChange={(_, value) => handlePaginationChange(value)}
          count={paginationCount}
        />
      </Container>

      <ModalWindow id={id} open={open} handleClose={handleClose} />
    </Container>
  );
};

export default RemixesPage;
