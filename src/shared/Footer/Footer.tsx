import { useMemo } from 'react';
import Box from '@mui/material/Box';
import getCurrentYear from '@/utils/getCurrentYear';
import styles from './styles';

const Footer = () => {
  const currentYearMemoized = useMemo(() => getCurrentYear(), []);
  return (
    <footer>
      <Box sx={styles.footer}>© {currentYearMemoized} Test App</Box>
    </footer>
  );
};

export default Footer;
