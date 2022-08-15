import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import styles from './styles';
import getRandomNumber from '@/utils/getRandomNumber';

const Home = () => {
  const randomNumberMemoized = useMemo(() => getRandomNumber(8, 9), []);
  const isMobile = useMediaQuery('(max-width:960px)');

  return (
    <Box sx={styles.video}>
      {!isMobile ? (
        <video autoPlay muted loop playsInline={false}>
          <source src={`./img/vid${randomNumberMemoized}.mp4`} type="video/mp4" />
        </video>
      ) : (
        <img src="./img/mobileBg2.jpg" alt="" />
      )}
      <Container maxWidth="md" sx={styles.text}>
        <Typography variant="h1">
          Seize the
          <br /> Stems of Production
        </Typography>
      </Container>
    </Box>
  );
};

export default Home;
