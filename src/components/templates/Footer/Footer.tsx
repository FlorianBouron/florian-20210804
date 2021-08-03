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
  isSocketClosed: boolean;
};

function Footer({ onKillFeed, onChangeMarket, isSocketClosed }: FooterProps): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={onChangeMarket}
        disabled={isSocketClosed}
      >
        Toggle Feed
      </Button>
      <Button
        className={classes.button}
        variant="contained"
        color={isSocketClosed ? 'primary' : 'secondary'}
        onClick={onKillFeed}
      >
        {isSocketClosed ? 'Connect' : 'Kill Feed'}
      </Button>
    </div>
  );
}

export default React.memo(
  Footer,
  (prevProp, nextProp) => prevProp.isSocketClosed === nextProp.isSocketClosed,
);
