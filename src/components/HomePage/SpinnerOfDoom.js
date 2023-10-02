import React from 'react';
import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';

export default function SpinnerOfDoom(props) {

  return (
    <div >
      <CircularProgress sx={
        {
          color: props.color,
          position: 'fixed',
          top: '45%',
          left: '45%',
        }
      } />

    </div>
  );
}
