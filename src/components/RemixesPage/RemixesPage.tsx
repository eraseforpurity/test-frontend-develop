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
import AbsoluteLoading from '../../shared/ui/AbsoluteLoading/AbsoluteLoading';
import ModalWindow from '../../shared/ModalWindow/ModalWindow';
import { DELETE_REMIX } from '../../graphql/mutations/mutations';
import { GET_REMIXES } from '../../graphql/queries/queries';
import { initailValuses } from './constants';

const RemixesPage: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number | undefined>(undefined);
  const [remixesPayload, setRemixesPayload] = useState<IRemixGetDto>(initailValuses);

  const { loading, data, refetch } = useQuery(GET_REMIXES, {
    variables: { payload: { ...remixesPayload } },
    notifyOnNetworkStatusChange: true
  });
  const [deleteRemix, { loading: deleteLoading }] = useMutation(DELETE_REMIX);
  const remixes = data?.remixes.items as Array<IRemixModel>;
  const totalItems = data?.remixes.meta.total as number;

  const handleOpen = () => setOpen(true);
  const handleClose = useCallback(
    (withRefecth: boolean) => {
      setId(undefined);
      setOpen(false);
      withRefecth && refetch({ payload: { ...remixesPayload } });
    },
    [remixesPayload, open, id]
  );

  const handleDeleteRemixClick = useCallback(
    (id: number) => {
      deleteRemix({ variables: { payload: { id } } }).then(() => {
        enqueueSnackbar('Row was deleted');
        refetch({ payload: { ...remixesPayload } });
      });
    },
    [remixesPayload, data]
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
      setRemixesPayload((prevState) => {
        return {
          ...prevState,
          paginate: {
            skip: prevState?.paginate?.take ? prevState.paginate.take * (value - 1) : 0,
            take: prevState?.paginate?.take ? prevState?.paginate?.take : 5
          }
        };
      });
    },
    [remixesPayload, page]
  );

  const handleSortingClick = useCallback(
    (columnName: string) => {
      setRemixesPayload((prevState) => {
        if (prevState.sorts?.length) {
          const obj = prevState.sorts[0];
          const currentDirection = obj.direction;
          if (currentDirection === SortDirectionEnum.Asc) {
            return { ...prevState, sorts: [{ columnName, direction: SortDirectionEnum.Desc }] };
          }
          return { ...prevState, sorts: [{ columnName, direction: SortDirectionEnum.Asc }] };
        }
        return { ...prevState, sorts: [{ columnName, direction: SortDirectionEnum.Asc }] };
      });
    },
    [remixesPayload]
  );

  if (loading || deleteLoading) return <AbsoluteLoading />;

  return (
    <Container sx={styles.container} maxWidth="xl">
      <TableContainer sx={styles.tableContainer} component={Paper}>
        <Table sx={styles.table} aria-label="simple table">
          <CustomTableHead
            remixesPayload={remixesPayload}
            handleSortingClick={handleSortingClick}
          />
          <TableBody>
            {remixes?.map((row: IRemixModel) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.authorEmail}</TableCell>
                <TableCell align="center">{row.genre}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">{row.trackLength}</TableCell>
                <TableCell align="center">{row.isStore && 'true'}</TableCell>
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
          count={
            remixesPayload?.paginate?.take
              ? Math.ceil(totalItems / remixesPayload.paginate.take)
              : 1
          }
        />
      </Container>
      <ModalWindow id={id} open={open} handleClose={handleClose} />
    </Container>
  );
};

export default RemixesPage;
