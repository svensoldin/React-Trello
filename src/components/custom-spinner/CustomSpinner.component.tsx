import * as React from 'react';

import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    color: '#2f80ed',
  },
});

const CustomSpinner = ({ ...props }) => {
  const classes = useStyles();
  return <CircularProgress className={classes.root} {...props} />;
};

export default CustomSpinner;
