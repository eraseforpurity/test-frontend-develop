import React, { FC, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useSnackbar } from 'notistack';
import { Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { IRemixModel, IFilterDto, IRemixGetDto } from '../../graphql/types/_server';
import AbsoluteLoading from '../../shared/ui/AbsoluteLoading/AbsoluteLoading';
import ModalWindow from '../../shared/ModalWindow/ModalWindow';
import { DELETE_REMIX } from '../../graphql/mutations/mutations';
import { GET_REMIXES } from '../../graphql/queries/queries';

const RemixesPage: FC = () => {
  const remixesPayload = {
    filters: [],
    sorts: []
  };

  const useQueryTable = (remixesPayload: IRemixGetDto) => {
    const { loading, error, data, refetch } = useQuery(GET_REMIXES, {
      variables: { payload: { ...remixesPayload } }
    });
    const remixes = data?.remixes.items;

    const refetchRemixes = () => refetch({ payload: { ...remixesPayload } });

    return { getRemixesLoading: loading, getRemixesError: error, remixes, refetchRemixes };
  };

  const { getRemixesLoading, remixes, refetchRemixes } = useQueryTable(remixesPayload);

  const [deleteRemix] = useMutation(DELETE_REMIX);

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setId(undefined);
  };
  const [id, setId] = useState(undefined);

  const handleDeleteRemixClick = (id: number) => {
    deleteRemix({ variables: { payload: { id } } }).then(() => {
      enqueueSnackbar('Row was deleted');
      refetchRemixes();
    });
  };

  if (getRemixesLoading) return <AbsoluteLoading />;

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }} maxWidth="lg">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell size="small">Name</TableCell>
              <TableCell align="center">authorEmail</TableCell>
              <TableCell align="center">genre</TableCell>
              <TableCell align="center">description</TableCell>
              <TableCell align="center">price</TableCell>
              <TableCell align="center">trackLength</TableCell>
              <TableCell align="center">isStore</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
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
                  <Button sx={{ mr: '10px', '&:hover': { bgcolor: 'green' } }} variant="contained">
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
      <Button onClick={handleOpen} sx={{ placeSelf: 'center', mt: '20px' }} variant="contained">
        Add Row
      </Button>
      {open && (
        <ModalWindow refetch={refetchRemixes} id={id} open={open} handleClose={handleClose} />
      )}
    </Container>
  );
};

export default RemixesPage;
