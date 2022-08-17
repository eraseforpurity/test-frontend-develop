import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useMutation, useQuery } from '@apollo/client';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { TextField, Box, Button, Select, MenuItem } from '@mui/material';
import styles from './styles';
import BackdropLoading from '../ui/BackdropLoading/BackdropLoading';
import { GenreTypeEnum, IRemixCreateDto, IRemixUpdateDto } from '../../graphql/types/_server';
import { CREATE_REMIX, UPDATE_REMIX } from '../../graphql/mutations/mutations';
import { GET_REMIX_BY_ID } from '../../graphql/queries/queries';
import { validationSchema } from '../../helpers/validation/validationSchema';

type IModalWindow = {
  open: boolean;
  handleClose: () => void;
  id: number | undefined;
};

const ModalWindow = ({ open, handleClose, id }: IModalWindow) => {
  const { enqueueSnackbar } = useSnackbar();

  const [initialValues, setRemixById] = useState<IRemixCreateDto | IRemixUpdateDto>({
    authorEmail: '',
    description: '',
    genre: GenreTypeEnum.Pop,
    isStore: true,
    name: '',
    price: 0,
    trackLength: 0
  });

  const isSkip = Boolean(id ?? false);

  const { data, loading: getRemixByIdLoading } = useQuery(GET_REMIX_BY_ID, {
    skip: !isSkip,
    variables: { payload: { id } },
    onCompleted: (data) => {
      setRemixById(data.remixById);
    }
  });

  const [createRemix, { loading }] = useMutation(CREATE_REMIX);
  const [updateRemix, { loading: updateLoading }] = useMutation(UPDATE_REMIX);

  const handleCreateRemix = (values: any) => {
    createRemix({ variables: { payload: { ...values } } })
      .then(({ data }) => {
        data?.createRemix?.isStore
          ? enqueueSnackbar('Row was added')
          : enqueueSnackbar('Row wasn`t stored');

        handleClose();
      })
      .catch(({ message }) => enqueueSnackbar(message));
  };

  const handleUpdateRemix = (values: any) => {
    let payload = { id };

    for (const key in values) {
      if (key in values) {
        if (data.remixById[key] !== values[key]) {
          payload = { ...payload, [key]: values[key] };
        }
      }
    }

    updateRemix({ variables: { payload: { ...payload } } })
      .then(({ data }) => {
        data?.updateRemix?.isStore
          ? enqueueSnackbar('Row was changed')
          : enqueueSnackbar('Row wasn`t stored');

        handleClose();
      })
      .catch(({ message }) => {
        enqueueSnackbar(message);
      });
  };

  const handleFormSubmit = (values: IRemixCreateDto | IRemixUpdateDto, id?: number) => {
    if (id ?? false) {
      handleUpdateRemix(values);
    } else {
      handleCreateRemix(values);
    }
  };

  const formik = useFormik({
    initialValues: { ...initialValues },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      handleFormSubmit(values, id);
    }
  });

  if (loading || getRemixByIdLoading || updateLoading) return <BackdropLoading />;

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
