import { createTheme } from '@material-ui/core/styles';
import {
  white,
  purple,
  red,
  gray,
  grayDark,
  garyLight,
} from './constants/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: purple,
    },
    secondary: {
      main: red,
    },
    background: {
      default: gray,
      paper: grayDark,
    },
  },
  overrides: {
    MuiTableCell: {
      head: {
        color: garyLight,
        fontWeight: 'bold',
      },
      body: {
        color: white,
        fontWeight: 'bold',
      },
    },
  },
});

export default theme;
