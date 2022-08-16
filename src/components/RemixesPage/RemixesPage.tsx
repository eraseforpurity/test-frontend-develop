import { FC, useCallback, useState } from 'react';
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
import { IRemixModel } from '../../graphql/types/_server';
import AbsoluteLoading from '../../shared/ui/AbsoluteLoading/AbsoluteLoading';
import ModalWindow from '../../shared/ModalWindow/ModalWindow';
import { DELETE_REMIX } from '../../graphql/mutations/mutations';
import { GET_REMIXES } from '../../graphql/queries/queries';

const RemixesPage: FC = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);
  const [id, setId] = useState(undefined);
  const [remixesPayload, setRemixesPayload] = useState({
    filters: [],
    sorts: []
  });

  const { loading, data, refetch } = useQuery(GET_REMIXES, {
    variables: { payload: { ...remixesPayload }, notifyOnNetworkStatusChange: true }
  });
  const [deleteRemix, { loading: deleteLoading }] = useMutation(DELETE_REMIX);
  const remixes = data?.remixes.items;

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

  if (loading || deleteLoading) return <AbsoluteLoading />;

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
      <ModalWindow id={id} open={open} handleClose={handleClose} />
    </Container>
  );
};

export default RemixesPage;
