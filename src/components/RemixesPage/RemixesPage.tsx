import React, { FC, useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IRemixModel } from '../../graphql/types/_server';
import AbsoluteLoading from '../../shared/ui/AbsoluteLoading/AbsoluteLoading';
import ModalWindow from '../../shared/ModalWindow/ModalWindow';

// const validationSchema = yup.object({
//   email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
//   password: yup
//     .string('Enter your password')
//     .min(8, 'Password should be of minimum 8 characters length')
//     .required('Password is required')
// });

const RemixesPage: FC = () => {
  const payload = {
    filters: [],
    sorts: []
  };

  const GET_REMIXES = gql`
    query GetRemixes($payload: RemixGetDTO!) {
      remixes(payload: $payload) {
        items {
          authorEmail
          createdDate
          description
          genre
          id
          isStore
          name
          price
          trackLength
          updatedDate
        }
        meta {
          isMy
          total
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_REMIXES, { variables: { payload } });

  const [tableState, setTableState] = useState<IRemixModel[]>([]);

  useEffect(() => {
    setTableState(data?.remixes.items);
  }, [data]);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (loading) return <AbsoluteLoading />;

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
            {tableState?.map((row: IRemixModel) => (
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
                  <Button sx={{ '&:hover': { bgcolor: 'red' } }} variant="contained">
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
      <ModalWindow open={open} handleClose={handleClose} />
    </Container>
  );
};

export default RemixesPage;
