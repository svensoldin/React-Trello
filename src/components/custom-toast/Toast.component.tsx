import * as React from 'react';
import { makeStyles, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert/Alert';
import { useAtom } from 'jotai';
import { toastAtom } from 'jotai/atoms';

const useStyles = makeStyles({
  root: {
    fontFamily: 'inherit',
  },
});

const Toast = () => {
  const [{ isOpen, message, severity }, setToast] = useAtom(toastAtom);
  const classes = useStyles();

  const handleClose = () => {
    setToast({
      isOpen: false,
      message,
      severity,
    });
  };
  return (
    <Snackbar open={isOpen} autoHideDuration={1500} onClose={handleClose}>
      <Alert severity={severity} variant='filled' className={classes.root}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
