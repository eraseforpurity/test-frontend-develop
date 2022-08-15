import { FC } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Container } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IRemixModel } from '../../graphql/types/_server';

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

  const Remixes = useQuery(GET_REMIXES, { variables: { payload } });

  console.log(Remixes.data);

  const remixesRows = Remixes?.data?.items;

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">authorEmail</TableCell>
              <TableCell align="right">genre</TableCell>
              <TableCell align="right">description</TableCell>
              <TableCell align="right">price</TableCell>
              <TableCell align="right">trackLength</TableCell>
              <TableCell align="right">isStore</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {remixesRows?.map((row: IRemixModel) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{}</TableCell>
                <TableCell align="right">{}</TableCell>
                <TableCell align="right">{}</TableCell>
                <TableCell align="right">{}</TableCell>
                <TableCell align="right">{}</TableCell>
                <TableCell align="right">{}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default RemixesPage;
