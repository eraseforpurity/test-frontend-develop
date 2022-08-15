import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <Typography variant="h2" align="center">
        404
      </Typography>
      <Typography variant="h6" align="center">
        <Link to="/">&larr; Go to Home Page</Link>
      </Typography>
    </>
  );
};

export default NotFound;
