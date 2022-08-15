import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@mui/material/styles';
import { ApolloProvider } from '@apollo/client';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import theme from '@/helpers/theme/theme';
import client from '@/helpers/client';
import AppRoutes from '../AppRoutes/AppRoutes';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SnackbarProvider
            maxSnack={3}
            hideIconVariant
            anchorOrigin={{
              horizontal: 'left',
              vertical: 'bottom'
            }}
          >
            <CssBaseline />
            <AppRoutes />
          </SnackbarProvider>
        </LocalizationProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
