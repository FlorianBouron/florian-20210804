import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#5741d9',
    },
    secondary: {
      main: '#b91d1d',
    },
    error: {
      main: '#b91d1d',
    },
    background: {
      default: '#28303e',
      paper: '#121723',
    },
  },
});

export default theme;
