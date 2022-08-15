import React from 'react';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { TextField, Box, Button, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IRemixCreateDto, GenreTypeEnum, IRemixUpdateDto } from '../../graphql/types/_server';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

type IModalWindow = {
  //   newRow: IRemixCreateDto | IRemixUpdateDto;
  open: boolean;
  handleClose: () => void;
};

// newRow.defaultProps = {
//   name: '',
//   description: '',
//   authorEmail: '',
//   genre: GenreTypeEnum.Electronic,
//   isStore: true,
//   price: 0,
//   trackLength: 0
// };

const ModalWindow = ({ open, handleClose }: IModalWindow) => {
  const [genre, setGenre] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setGenre(event.target.value as string);
  };

  //   const formik = useFormik({
  //     initialValues: {
  //       name: newRow?.name || '',
  //       authorEmail: ''
  //     },

  //     onSubmit: (values) => {
  //       alert(JSON.stringify(values, null, 2));
  //     }
  //   });
  console.log();

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">authorEmail</TableCell>
              <TableCell align="center">genre</TableCell>
              <TableCell align="center">description</TableCell>
              <TableCell align="center">price</TableCell>
              <TableCell align="center">trackLength</TableCell>
              <TableCell align="center">isStore</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="newRow">
                <TextField id="name" name="name" />
              </TableCell>
              <TableCell align="center">
                <TextField id="authorEmail" name="authorEmail" />
              </TableCell>
              <TableCell align="center">
                <Select id="genre" name="genre" value={genre} onChange={handleChange}>
                  {Object.values(GenreTypeEnum).map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      {genre}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell align="center">
                <TextField id="description" name="description" multiline maxRows={4} />
              </TableCell>
              <TableCell align="center">
                <TextField id="price" name="price" />
              </TableCell>
              <TableCell align="center">
                <TextField id="trackLength" name="trackLength" />
              </TableCell>
              <TableCell align="center">
                <TextField id="isStore" name="isStore" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button variant="contained">Save Changes</Button>
      </Box>
    </Modal>
  );
};

export default ModalWindow;
