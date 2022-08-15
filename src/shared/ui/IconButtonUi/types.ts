import { IconButtonProps, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export interface IProps extends IconButtonProps {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  fontSize: number;
  Icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>> & { muiName: string };
}
