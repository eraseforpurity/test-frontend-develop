import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { FC, memo } from 'react';
import styles from './styles';

const BackdropLoading: FC = ({ ...props }) => {
  return (
    <Backdrop sx={styles} open>
      <CircularProgress {...props} color="secondary" size={30} />
    </Backdrop>
  );
};

export default memo(BackdropLoading);
