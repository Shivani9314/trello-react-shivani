import React from 'react';
import { CircularProgress, Box } from '@mui/material';

export default function Loader() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        padding: 2,
      }}
    >
      <CircularProgress size={50} thickness={4} />
    </Box>
  );
}
