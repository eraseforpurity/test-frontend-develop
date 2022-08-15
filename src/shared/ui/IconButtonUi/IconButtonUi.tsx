import { FC, memo } from 'react';
import IconButton from '@mui/material/IconButton';
import { IProps } from './types';

const IconButtonUi: FC<IProps> = ({ handleClick, fontSize, Icon, ...props }) => {
  return (
    <IconButton
      {...props}
      onClick={(event) => handleClick(event)}
      disabled={props.disabled}
      color="inherit"
    >
      <Icon sx={{ fontSize }} />
    </IconButton>
  );
};

export default memo(IconButtonUi);
