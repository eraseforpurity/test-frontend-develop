import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import colors from './colors';

const theme = createTheme({
  typography: {
    fontFamily: "'Inconsolata', monospace, sans-serif",
    button: {
      textTransform: 'none',
      lineHeight: '1.4'
    },
    fontSize: 16,
    h1: {
      fontFamily: "'Inconsolata-Expanded', monospace, sans-serif",
      fontSize: '4rem'
    },
    h2: {
      fontFamily: "'Inconsolata-Expanded', monospace, sans-serif",
      fontSize: '3.2rem'
    },
    h3: {
      fontFamily: "'Inconsolata-Expanded', monospace, sans-serif",
      fontSize: '2.4rem'
    },
    h4: {
      fontFamily: "'Inconsolata-Expanded', monospace, sans-serif",
      fontSize: '2rem'
    },
    h5: {
      fontFamily: "'Inconsolata-Expanded', monospace, sans-serif",
      fontSize: '1.4rem'
    },
    h6: {
      fontFamily: "'Inconsolata-Expanded', monospace, sans-serif",
      fontSize: '1rem'
    }
  },
  palette: {
    mode: 'light',
    background: {
      default: colors.background.default,
      paper: colors.background.default
    },
    primary: {
      main: colors.accent1
    },
    secondary: {
      main: colors.accent2
    }
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          ':disabled': {
            color: 'inherit',
            opacity: 0.26
          }
        }
      }
    }
  },
  shape: {
    borderRadius: 12
  }
});

export default responsiveFontSizes(theme, { factor: 2 });
