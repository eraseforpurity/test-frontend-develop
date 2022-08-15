import { NavLink } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from './styles';

const Header = () => {
  return (
    <header>
      <Box sx={styles.filler} />
      <Box sx={styles.headerWrapper}>
        <Container sx={styles.header} maxWidth="lg">
          <nav>
            <ul style={{ display: 'flex', gap: '20px' }}>
              <li>
                <Typography variant="h6" align="center">
                  <NavLink
                    style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
                    to="/"
                  >
                    Home Page
                  </NavLink>
                </Typography>
              </li>
              <li>
                <Typography variant="h6" align="center">
                  <NavLink
                    style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
                    to="/remixes"
                  >
                    Remixes
                  </NavLink>
                </Typography>
              </li>
            </ul>
          </nav>
        </Container>
      </Box>
    </header>
  );
};

export default Header;
