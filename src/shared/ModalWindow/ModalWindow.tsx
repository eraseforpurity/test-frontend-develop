import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useMutation, useQuery } from '@apollo/client';
import Modal from '@mui/material/Modal';
import { useFormik } from 'formik';
import { TextField, Box, Button, MenuItem, Typography } from '@mui/material';
import styles from './styles';
import BackdropLoader from '../ui/BackdropLoader/BackdropLoader';
import { GenreTypeEnum, IRemixCreateDto, IRemixUpdateDto } from '../../graphql/types/_server';
import { CREATE_REMIX, UPDATE_REMIX } from '../../graphql/mutations/mutations';
import { GET_REMIX_BY_ID } from '../../graphql/queries/queries';
import { validationSchema } from '../../helpers/validation/validationSchema';
import { initailValues } from './constants';

type ModalWindowProps = {
  open: boolean;
  handleClose: (withRefecth: boolean) => void;
  id: number | undefined | null;
};

const ModalWindow = ({ open, handleClose, id }: ModalWindowProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const [initialValues, setRemixById] = useState<IRemixCreateDto | IRemixUpdateDto>(initailValues);

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

  const handleCreateRemix = (values: IRemixCreateDto) => {
    createRemix({ variables: { payload: { ...values } } })
      .then(({ data }) => {
        data?.createRemix?.isStore
          ? enqueueSnackbar('Row was added')
          : enqueueSnackbar('Row wasn`t stored');

        handleClose(true);
      })
      .catch(({ message }) => enqueueSnackbar(message));
  };

  const handleUpdateRemix = (values: IRemixUpdateDto) => {
    let payload = { id };

    for (const key in values) {
      if (key in values) {
        if (data.remixById[key] !== values[key as keyof typeof values]) {
          payload = { ...payload, [key]: values[key as keyof typeof values] };
        }
      }
    }

    updateRemix({ variables: { payload: { ...payload } } })
      .then(({ data }) => {
        data?.updateRemix?.isStore
          ? enqueueSnackbar('Row was changed')
          : enqueueSnackbar('Row wasn`t stored');

        handleClose(true);
      })
      .catch(({ message }) => {
        enqueueSnackbar(message);
      });
  };

  const handleFormSubmit = (values: IRemixCreateDto | IRemixUpdateDto, id?: number | null) => {
    if (id ?? false) {
      handleUpdateRemix(values as IRemixUpdateDto);
    } else {
      handleCreateRemix(values as IRemixCreateDto);
    }
  };

  const formik = useFormik({
    initialValues: { ...initialValues },
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values: IRemixCreateDto | IRemixUpdateDto) => {
      handleFormSubmit(values, id);
    }
  });

  const handleWindowClose = () => {
    formik.resetForm();
    setRemixById(initailValues);
    handleClose(false);
  };

  const priceValue = formik.values.price?.toString();
  const trackLengthValue = formik.values.trackLength?.toString();

  return loading || getRemixByIdLoading || updateLoading ? (
    <BackdropLoader />
  ) : (
    <Modal open={open} onClose={handleWindowClose}>
      <Box sx={styles.modal}>
        <form onSubmit={formik.handleSubmit}>
          <Box sx={styles.formContainer}>
            <Typography variant="h6">{isSkip ? 'Edit row' : 'Create row'}</Typography>

            <TextField
              helperText={formik.touched.name && formik.errors.name}
              error={formik.touched.name && Boolean(formik.errors.name)}
              label="Name"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />

            <TextField
              helperText={formik.touched.authorEmail && formik.errors.authorEmail}
              error={formik.touched.authorEmail && Boolean(formik.errors.authorEmail)}
              label="Author Email"
              value={formik.values.authorEmail}
              onChange={formik.handleChange}
              id="authorEmail"
              name="authorEmail"
            />

            <TextField
              select
              label="Genre"
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
            </TextField>

            <TextField
              helperText={formik.touched.description && formik.errors.description}
              error={formik.touched.description && Boolean(formik.errors.description)}
              label="Description"
              multiline
              maxRows={5}
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />

            <TextField
              helperText={formik.touched.price && formik.errors.price}
              error={formik.touched.price && Boolean(formik.errors.price)}
              label="Price"
              type="number"
              id="price"
              name="price"
              value={priceValue}
              onChange={formik.handleChange}
            />

            <TextField
              helperText={formik.touched.trackLength && formik.errors.trackLength}
              error={formik.touched.trackLength && Boolean(formik.errors.trackLength)}
              label="Track Length"
              type="number"
              id="trackLength"
              name="trackLength"
              value={trackLengthValue}
              onChange={formik.handleChange}
            />
          </Box>

          <Button sx={styles.saveButton} type="submit" variant="contained">
            {isSkip ? 'Save Changes' : 'Save'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalWindow;
