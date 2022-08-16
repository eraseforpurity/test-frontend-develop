import { useSnackbar } from 'notistack';
import { useMutation } from '@apollo/client';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import {
  TextField,
  Box,
  Button,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import styles from './styles';
import BackdropLoading from '../ui/BackdropLoading/BackdropLoading';
import { GenreTypeEnum } from '../../graphql/types/_server';
import { CREATE_REMIX } from '../../graphql/mutations/mutations';
import { validationSchema } from '../../helpers/validation/validationSchema';

type IModalWindow = {
  open: boolean;
  handleClose: () => void;
  id: boolean | undefined;
};

const ModalWindow = ({ open, handleClose, id }: IModalWindow) => {
  const { enqueueSnackbar } = useSnackbar();

  const [createRemix, { loading }] = useMutation(CREATE_REMIX);

  const formik = useFormik({
    initialValues: {
      authorEmail: '',
      description: '',
      genre: GenreTypeEnum.Pop,
      isStore: true,
      name: '',
      price: 0,
      trackLength: 0
    },
    validationSchema,
    onSubmit: (values) => {
      createRemix({ variables: { payload: { ...values } } })
        .then(() => {
          enqueueSnackbar('Row was added');
          handleClose();
        })
        .catch(() => enqueueSnackbar('oops, an error'));
    }
  });

  if (loading) return <BackdropLoading />;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={styles.modal}>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={styles.formContainer}>
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

export default ModalWindow;
