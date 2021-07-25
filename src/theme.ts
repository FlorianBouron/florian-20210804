import { createTheme } from '@material-ui/core/styles';
import {
  purple, red, gray, grayDark,
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
});

export default theme;
