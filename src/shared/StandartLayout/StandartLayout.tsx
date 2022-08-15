import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { FC } from 'react';

const StandartLayout: FC<{ children: JSX.Element }> = ({ children }) => {
  return (
    <Box my={4}>
      <Container maxWidth="md">{children}</Container>
    </Box>
  );
};

export default StandartLayout;
