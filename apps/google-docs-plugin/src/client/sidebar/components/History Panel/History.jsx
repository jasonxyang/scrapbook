import React from 'react';
import SavedRemix from './SavedRemix';
import Stack from '@mui/material/Stack';

function History() {
  return (
    <Stack 
    direction={{ xs: 'column'}}
    spacing={{ xs: 5}}>
      <SavedRemix/>
      <SavedRemix/>
    </Stack>
  )
};

export default History;
