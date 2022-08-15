import { FC, memo } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { IProps } from './types';
import styles from './styles';

const AbsoluteLoading: FC<IProps> = ({ size = 40, color = 'primary', ...props }) => {
  return (
    <Box sx={styles}>
      <CircularProgress size={size} color={color} {...props} />
    </Box>
  );
};

export default memo(AbsoluteLoading);
