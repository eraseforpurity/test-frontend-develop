import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';

import Header from '@/shared/Header/Header';
import Footer from '@/shared/Footer/Footer';
import styles from './styles';

const Layout = () => {
  return (
    <Box sx={styles.layout}>
      <Header />
      <Box sx={styles.main}>
        <main>
          <Outlet />
        </main>
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
