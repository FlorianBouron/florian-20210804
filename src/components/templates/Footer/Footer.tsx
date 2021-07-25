import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0',
  },
  button: {
    margin: '0 10px',
  },
}));

export default function Footer(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button className={classes.button} variant="contained" color="primary">
        Toggle Feed
      </Button>
      <Button className={classes.button} variant="contained" color="secondary">
        Kill Feed
      </Button>
    </div>
  );
}
