import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useMutation } from '@apollo/client';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Box,
  Button,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import BackdropLoading from '../ui/BackdropLoading/BackdropLoading';
import { IRemixCreateDto, GenreTypeEnum, IRemixUpdateDto } from '../../graphql/types/_server';
import { CREATE_REMIX } from '../../graphql/mutations/mutations';

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

const boxStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '30px'
};

type IModalWindow = {
  // newRow?: IRemixCreateDto | IRemixUpdateDto;
  open: boolean;
  handleClose: () => void;
  id: boolean | undefined;
  refetch?: () => void;
};

const defaultProps = {
  refetch: () => {}
};

const SignupSchema = Yup.object().shape({
  authorEmail: Yup.string().email('Invalid email').required('Required'),
  description: Yup.string().max(500, 'Maximum 500 charaters'),
  name: Yup.string()
    .min(3, 'Minimal 3 charaters')
    .max(50, 'Maximum 50 charaters')
    .required('Required'),
  price: Yup.number().max(1000, 'Max price is 1000').min(0, 'Min price is 0'),
  trackLength: Yup.number().max(300, 'Max trackLength is 1000').min(0, 'Min trackLength is 0')
});
const ModalWindow = ({ open, handleClose, id, refetch }: IModalWindow) => {
  const { enqueueSnackbar } = useSnackbar();

  const [createRemix, { data, loading, error }] = useMutation(CREATE_REMIX);

  const formik = useFormik({
    initialValues: {
      authorEmail: '',
      description: '',
      genre: GenreTypeEnum.Pop,
      isStore: false,
      name: '',
      price: 0,
      trackLength: 0
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      createRemix({ variables: { payload: { ...values } } })
        .then(() => {
          refetch && refetch();
          enqueueSnackbar('Row was added');
          handleClose();
        })
        .catch((err) => enqueueSnackbar(err));
    }
  });

  if (loading) return <BackdropLoading />;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={boxStyle}>
            <TextField
              helperText={formik.touched.name && formik.errors.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              label="name"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />

            <TextField
              helperText={formik.touched.authorEmail && formik.errors.authorEmail}
              error={formik.touched.authorEmail && Boolean(formik.errors.authorEmail)}
              label="authorEmail"
              value={formik.values.authorEmail}
              onChange={formik.handleChange}
              id="authorEmail"
              name="authorEmail"
            />

            <Select
              label="genre"
              id="genre"
              name="genre"
              value={formik.values.genre}
              onChange={formik.handleChange}
            >
              {Object.values(GenreTypeEnum).map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </Select>

            <TextField
              helperText={formik.touched.description && formik.errors.description}
              error={formik.touched.description && Boolean(formik.errors.description)}
              label="description"
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />

            <TextField
              helperText={formik.touched.price && formik.errors.price}
              error={formik.touched.price && Boolean(formik.errors.price)}
              label="price"
              type="number"
              id="price"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
            />

            <TextField
              helperText={formik.touched.trackLength && formik.errors.trackLength}
              error={formik.touched.trackLength && Boolean(formik.errors.trackLength)}
              label="trackLength"
              type="number"
              id="trackLength"
              name="trackLength"
              value={formik.values.trackLength}
              onChange={formik.handleChange}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="isStore"
                  id="isStore"
                  onChange={formik.handleChange}
                  checked={formik.values.isStore}
                />
              }
              label="Is Store"
            />
          </Box>
          <Button type="submit" variant="contained">
            Save Changes
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

ModalWindow.defaultProps = defaultProps;

export default ModalWindow;
