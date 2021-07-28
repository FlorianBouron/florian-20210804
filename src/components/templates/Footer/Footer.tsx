import React from 'react';
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

type FooterProps = {
  onKillFeed: () => void;
  onChangeMarket: () => void;
};

function Footer({ onKillFeed, onChangeMarket }: FooterProps): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={onChangeMarket}
      >
        Toggle Feed
      </Button>
      <Button className={classes.button} variant="contained" color="secondary" onClick={onKillFeed}>
        Kill Feed
      </Button>
    </div>
  );
}

export default React.memo(Footer, () => true);
