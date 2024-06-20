import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#43919B',
      contrastText: '#fff',
      accent: '#95D2B3',
    },
    secondary: {
      main: '#0C1619',
      dark: '#000',
      border: '#555',
      contrastText: '#ffffff',
    },
    background: {
      default: '#222831',
      paper: '#232931'
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
      disabled: '#ffffff',
      hint: '#ffffff',
    }
  },
  typography: {
    h1: {
      fontSize: '1.5rem',
      fontWeight: 300,
      color: '#ffffff',
    },
    h2: {
      fontSize: '1rem',
      fontWeight: 300,
      color: '#ffffff',
    },
    button: {
      color: '#ffffff'
    }
  },
});

export default theme;
