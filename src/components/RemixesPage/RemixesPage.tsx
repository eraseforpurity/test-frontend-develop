import { FC, useCallback, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import CustomTableHead from '@/shared/CustomTableHead/CustomTableHead';

import { IRemixModel, IRemixGetDto, SortDirectionEnum } from '../../graphql/types/_server';
import AbsoluteLoading from '../../shared/ui/AbsoluteLoading/AbsoluteLoading';
import ModalWindow from '../../shared/ModalWindow/ModalWindow';
import { DELETE_REMIX } from '../../graphql/mutations/mutations';
import { GET_REMIXES } from '../../graphql/queries/queries';

const RemixesPage: FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [id, setId] = useState<number | undefined>(undefined);
  const [remixesPayload, setRemixesPayload] = useState<IRemixGetDto>({
    filters: undefined,
    sorts: undefined,
    paginate: {
      skip: 0,
      take: 5
    }
  });

  const { loading, data, refetch } = useQuery(GET_REMIXES, {
    variables: { payload: { ...remixesPayload } },
    notifyOnNetworkStatusChange: true
  });
  const [deleteRemix, { loading: deleteLoading }] = useMutation(DELETE_REMIX);
  const remixes = data?.remixes.items;
  const totalItems = data?.remixes.meta.total;

  const handleOpen = () => setOpen(true);
  const handleClose = useCallback(() => {
    setOpen(false);
    refetch({ payload: { ...remixesPayload } });
    setId(undefined);
  }, [remixesPayload, open]);

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

  const handlePaginationChange = (value: number) => {
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
  };

  const handleSortingClick = (columnName: string) => {
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
  };

  if (loading || deleteLoading) return <AbsoluteLoading />;

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }} maxWidth="lg">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <CustomTableHead
            remixesPayload={remixesPayload}
            handleSortingClick={handleSortingClick}
          />
          <TableBody>
            {remixes?.map((row: IRemixModel) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.authorEmail}</TableCell>
                <TableCell align="center">{row.genre}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">{row.trackLength}</TableCell>
                <TableCell align="center">{row.isStore && 'true'}</TableCell>
                <TableCell align="center">
                  <Button
                    onClick={() => handleEditRemixClick(row.id)}
                    sx={{ mr: '10px', '&:hover': { bgcolor: 'green' } }}
                    variant="contained"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteRemixClick(row.id)}
                    sx={{ '&:hover': { bgcolor: 'red' } }}
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
      <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Button onClick={handleOpen} sx={{ placeSelf: 'center', mt: '20px' }} variant="contained">
          Add Row
        </Button>

        <Pagination
          size="small"
          page={page}
          onChange={(_, value) => handlePaginationChange(value)}
          count={Math.ceil(
            remixesPayload?.paginate?.take ? totalItems / remixesPayload.paginate.take : 5
          )}
        />
      </Container>
      <ModalWindow id={id} open={open} handleClose={handleClose} />
    </Container>
  );
};

export default RemixesPage;
